import {
  isArray,
  isEmpty,
  has,
  find,
  filter
} from 'lodash'
import {
  DotType,
  Measure,
  Note,
  NoteType,
  SlurType,
  SlurNote,
  Time
} from '../types'
import getChordName from './getChordName'
import noteTypeToNumber from './noteTypeToNumber'
import getBpm from './getBpm'
import getBeats from './getBeats'
import getBeatType from './getBeatType'
import getCapo from './getCapo'

/**
 * 是否TAB音符
 */
function isTabNote(noteXML): boolean {
  const { notations } = noteXML

  return !isEmpty(notations) && !isEmpty(notations.technical)
}

/**
 * 是否休止符
 */
function isRest(noteXML): boolean {
  return has(noteXML, 'rest')
}

/**
 * 是否和弦音符
 */
function isChord(noteXML): boolean {
  return has(noteXML, 'chord')
}

/**
 * 延音线判断
 */
function hasTie(noteXML): boolean {
  return has(noteXML, 'tie')
}

/**
 * 连音判断
 */
function hasSlur(noteXML): boolean {
  return has(noteXML, 'time-modification')
}

/**
 * 是否附点
 */
function hasDot(noteXML): DotType {
  if (!has(noteXML, 'dot')) {
    return ''
  }

  if (isArray(noteXML.dot) && noteXML.dot.length >= 2) {
    return 'doubleDot'
  }

  return 'dot'
}

/**
 * 创建空白节点
 */
function createBlankNode(id: string, measureId: string): Note {
  return {
    id,
    measureId,
    type: 'whole',
    view: 'blank',
    data: null
  }
}

/**
 * 创建休止符节点
 */
function createRestNode(id: string, measureId: string, noteXML: any): Note {
  const { type } = noteXML

  return {
    id,
    measureId,
    type,
    view: 'rest',
    data: null,
    dot: hasDot(noteXML)
  }
}

/**
 * 创建单音符节点
 */
function createSingleNode(id, measureId, noteXML): Note {
  const { type, notations, pitch } = noteXML
  const { fret, string } = notations.technical || {}
  const { step, octave, alter } = pitch

  return {
    id,
    measureId,
    type,
    view: 'single',
    data: {
      string, // MusicXML的string是从1开始
      fret,
      step: alter ? `${step}#` : step,
      octave
    },
    dot: hasDot(noteXML)
  }
}

/**
 * 创建和弦节点
 */
function createChordNode(noteXML, lastNode): Note {
  const { notations, pitch } = noteXML
  const { fret, string } = notations.technical
  const { step, octave, alter } = pitch

  const nodeData = {
    string, // MusicXML的string是从1开始
    fret,
    step: alter ? `${step}#` : step,
    octave
  }

  if (lastNode.view === 'chord') { // 如果前一个节点是和弦类型，则直接做添加处理
    lastNode.data.push(nodeData)
    lastNode.name = getChordName(lastNode.data)
    return lastNode
  }

  return {
    id: lastNode.id,
    measureId: lastNode.measureId,
    type: lastNode.type,
    view: 'chord',
    name: '',
    data: [lastNode.data, nodeData],
    dot: lastNode.dot || hasDot(noteXML)
  }
}

/**
 * 添加连音属性
 */
function appendSlurProps(noteXML: any, slurType: SlurType): SlurNote {
  const { 'time-modification': timeModification } = noteXML

  return {
    type: slurType,
    actualNotes: timeModification['actual-notes'],
    normalNotes: timeModification['normal-notes']
  }
}

/**
 * 添加延音线属性
 */
function appendTieProps(noteXML) {
  const { notations } = noteXML
  const { _type } = notations.tied

  return {
    tie: {
      type: _type
    }
  }
}

/**
 * 计算音符时长
 */
function calNoteDuration(node, bpm: number, bpmUnit: NoteType) {
  const { type, slur, dot } = node

  const unit: number = noteTypeToNumber(bpmUnit) // 自定义BPM单位

  let duration = Math.floor(60 / bpm * (unit / noteTypeToNumber(type)) * 1000)

  if (!isEmpty(slur)) { // 连音
    const { actualNotes, normalNotes, type } = slur
    let radix = 0

    if (type === 'end') {
      radix = (Math.floor(100 / actualNotes) + (100 % actualNotes)) / 100 // 如果除不尽，则在末尾填补
    } else {
      radix = Math.floor(100 / actualNotes) / 100
    }

    duration = Math.floor(duration * normalNotes * radix)
  }

  if (dot === 'dot') { // 附点
    duration = Math.floor(duration * 1.5)
  } else if (dot === 'doubleDot') { // 复附点
    duration = Math.floor(duration * 1.75)
  }

  return duration
}

/**
 * 创建时间轴
 */
function createTimeline(measures: Measure[], notes: Note[], bpmUnit: NoteType): Time[] {
  const timeline: any = []
  let timeAddUp: number = 0

  notes.map((note: Note) => {
    const { id, measureId } = note;
    const measure: Measure | undefined = find(measures, { id: measureId })

    if (!measure) {
      return;
    }

    const { bpm } = measure // 支持动态切换bpm
    const duration = calNoteDuration(note, bpm, bpmUnit)
    const startTime = timeAddUp
    const endTime = timeAddUp + duration

    timeline.push({
      noteId: id,
      measureId,
      duration,
      startTime,
      endTime
    })

    timeAddUp = endTime
  })

  return timeline
}

interface QueryData {
  measureList: Measure[]
  noteList: Note[]
  timeline: Time[]
}

/**
 * 解析数据
 */
export default function parseData(
  measureXML: any = [],
  clef: any = {},
  bpm: number = 0,
  bpmUnit: NoteType,
  speed: number = 1
): QueryData {
  const mList: Measure[] = []
  const nList: Note[] = []

  let nodeCount = 1
  let beats: number
  let beatType: number
  let globalBPM = 60

  measureXML.map((measure: any) => {
    if (isEmpty(measure)) {
      return
    }

    const { _number, note, partId } = measure

    globalBPM = getBpm(measure) || globalBPM
    let mBpm = bpm || globalBPM
    mBpm = Math.round(mBpm * speed)

    beats = getBeats(measure) || beats
    beatType = getBeatType(measure) || beatType

    let capo = getCapo(measure) || 0

    // 添加小节
    const measureId: string = `M_${_number}`
    mList.push({
      id: measureId,
      partId,
      bpm: mBpm,
      beats,
      beatType,
      capo
    })

    if (isEmpty(note)) { // 空节点处理
      const id: string = `N_${nodeCount}`
      const node: any = createBlankNode(id, measureId)

      nList.push(node)
      nodeCount++
      return
    }

    let notes: any = []

    if (!isArray(note)) {
      notes = [note]
    } else {
      notes = note
    }

    if (clef.number) { // 如果元数据存在多种曲谱类型，则根据当前类型做筛选处理
      notes = filter(notes, { staff: Number(clef.number) })
    }

    let slurTotal = 0 // 需合并数量
    let slurMerged = 0 // 已合并数量
    let slurType: SlurType = 'start' // 连音类型

    notes.map((subItem) => {
      const id: string = `N_${nodeCount}`
      let node: Note = { id: '', measureId: '', type: 'quarter', view: 'single', data: null }

      if (isChord(subItem)) { // 和弦
        const end = nList.length - 1 // 取最后一个节点元素
        const lastNode = nList[end]
        const node = createChordNode(subItem, lastNode) || {}
        nList[end] = {
          ...lastNode,
          ...node
        }

        return
      } else if (isRest(subItem)) { // 休止符
        node = createRestNode(id, measureId, subItem)
      } else if (isTabNote(subItem)) { // 单音符
        node = createSingleNode(id, measureId, subItem)
      }

      if (hasTie(subItem)) { // 延音线
        const props = appendTieProps(subItem)
        node = {
          ...node,
          ...props
        }
      }

      if (hasSlur(subItem)) { // 连音
        slurTotal = subItem['time-modification']['actual-notes']
        slurMerged++

        if (slurMerged === 1) {
          slurType = 'start'
        } else if (slurMerged > 1 && slurMerged < slurTotal) {
          slurType = 'continue'
        } else if (slurMerged === slurTotal) {
          slurType = 'end'
          slurTotal = 0
          slurMerged = 0
        }

        node = {
          ...node,
          slur: appendSlurProps(subItem, slurType)
        }
      }

      if (isEmpty(node)) {
        return
      }

      nList.push(node)
      nodeCount++
    })
  })

  return {
    measureList: mList,
    noteList: nList,
    timeline: createTimeline(mList, nList, bpmUnit)
  }
}
