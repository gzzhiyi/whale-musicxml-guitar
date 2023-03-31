import { filter, isArray, isEmpty } from 'lodash'
import {
  MeasureXML,
  Measure,
  Clef,
  Note,
  NoteType,
  SlurType
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
import calNoteDuration from './note/calNoteDuration'
import setMeasureTimeProps from './measure/setMeasureTimeProps'
import setNoteTimeProps from './note/setNoteTimeProps'
import setNoteSlurProps from './note/setNoteSlurProps'
import setNoteTieProps from './note/setNoteTieProps'
import setSingleNoteProps from './note/setSingleNoteProps'
import setChordNoteProps from './note/setChordNoteProps'
import setRestNoteProps from './note/setRestNoteProps'

interface ReturnData {
  measureList: Measure[]
  noteList: Note[]
}

/**
 * 解析数据
 */
export default function parseData(
  measureXML: MeasureXML[] = [],
  clef: Clef = {},
  speed: number = 1,
  bpmUnit: NoteType
): ReturnData {
  const mList: Measure[] = []
  const nList: Note[] = []

  let globalBpm: number = 60
  let globalBeats: number
  let globalBeatType: number
  let globalCapo: number = 0

  let noteCount: number = 1 // 音符数量累计
  let timeAddUp: number = 0 // 时间累计
  let mStartTime: number = 0 // 小节开始时间

  measureXML.map((measure: MeasureXML) => {
    if (isEmpty(measure)) {
      return
    }

    const { _number, note, partId } = measure

    let bpm: number = getBpm(measure) || globalBpm
    bpm = Math.round(bpm * speed)

    const beats: number = getBeats(measure) || globalBeats
    const beatType: number = getBeatType(measure) || globalBeatType
    const capo: number = getCapo(measure) || globalCapo

    // 设置全局
    globalBpm = bpm
    globalBeats = beats
    globalBeatType = beatType
    globalCapo = capo

    const measureId: string = `M_${_number}` // 生成小节ID

    // 如果小节没有<note>，则自动添加一个全休止符
    if (isEmpty(note)) {
      const node: Note = { id: `N_${noteCount}`, measureId, type: 'whole', view: 'rest' }
      nList.push(node)
      noteCount++
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
      let node: Note = { id: `N_${noteCount}`, measureId }

      if (isChord(subItem)) { // 和弦
        const index: number = nList.length - 1 // 取最后一个节点元素
        const lastNode: Note = nList[index]
        const node: Note = setChordNoteProps(lastNode, subItem)
        nList[index] = node
        return
      } else if (isRest(subItem)) { // 休止符
        node = setRestNoteProps(node, subItem)
      } else if (isTabNote(subItem)) { // 单音符
        node = setSingleNoteProps(node, subItem)
      }

      if (hasTie(subItem)) { // 延长音
        node = setNoteTieProps(node, subItem)
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

        node = setNoteSlurProps(node, subItem, slurType) // 添加延长音属性
      }

      if (isEmpty(node)) { // 异常处理
        return
      }

      // 设置音符时间属性
      const duration = calNoteDuration(node, bpm, bpmUnit)
      timeAddUp += duration
      node = setNoteTimeProps(node, timeAddUp, duration)

      // 添加到音符列表
      nList.push(node)
      noteCount++
    })

    // 添加到小节列表
    let m: Measure = {
      id: measureId,
      partId,
      bpm,
      beats,
      beatType,
      capo
    }
    m = setMeasureTimeProps(m, mStartTime, timeAddUp) // 设置小节时间属性
    mList.push(m)

    mStartTime += timeAddUp
  })

  return {
    measureList: mList,
    noteList: nList
  }
}
