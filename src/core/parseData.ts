import {
  isArray,
  isEmpty,
  find,
  filter
} from 'lodash'
import {
  MeasureXML,
  Clef,
  Note,
  NoteType,
  SlurType,
  SlurNote,
  Time
} from '../types'
import {
  isTabNote,
  isRest,
  isChord,
  hasTie,
  hasSlur
} from './validate'
import getBpm from './measure/getBpm'
import getBeats from './measure/getBeats'
import getBeatType from './measure/getBeatType'
import getCapo from './measure/getCapo'
import createSingleNote from './note/createSingleNote'
import createChordNote from './note/createChordNote'
import createRestNote from './note/createRestNote'
import noteTypeToNumber from './note/noteTypeToNumber'

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
function createTimeline(measures: MeasureXML[], notes: Note[], bpmUnit: NoteType): Time[] {
  const timeline: any = []
  let timeAddUp: number = 0

  notes.map((note: Note) => {
    const { id, measureId } = note;
    const measure: MeasureXML | undefined = find(measures, { id: measureId })

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
  measureList: MeasureXML[]
  noteList: Note[]
  timeline: Time[]
}

/**
 * 解析数据
 */
export default function parseData(
  measureXML: MeasureXML[] = [],
  clef: Clef = {},
  bpm: number = 0,
  bpmUnit: NoteType,
  speed: number = 1
): QueryData {
  const mList: MeasureXML[] = []
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
      const node: any = createRestNote(id, measureId, { type: 'whole' })

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
        const node = createChordNote(subItem, lastNode) || {}
        nList[end] = {
          ...lastNode,
          ...node
        }

        return
      } else if (isRest(subItem)) { // 休止符
        node = createRestNote(id, measureId, subItem)
      } else if (isTabNote(subItem)) { // 单音符
        node = createSingleNote(id, measureId, subItem)
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
