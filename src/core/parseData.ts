import { isArray, isEmpty, isObject } from 'lodash'
import {
  MeasureXML,
  Measure,
  Note,
  NoteType,
  SlurType
} from '../types'
import {
  isTabNote,
  isRest,
  isChord,
  hasTie,
  hasSlur,
  getDot,
  getBeam
} from './utils'
import getBpm from './measure/getBpm'
import getBeats from './measure/getBeats'
import getBeatType from './measure/getBeatType'
import getCapo from './measure/getCapo'
import calNoteDuration from './note/calNoteDuration'
import calNoteWidth from './note/calNoteWidth'
import setMeasureTimeProps from './measure/setMeasureTimeProps'
import setMeasureSizeProps from './measure/setMeasureSizeProps'
import setMeasureCoordProps from './measure/setMeasureCoordProps'
import setNoteTimeProps from './note/setNoteTimeProps'
import setNoteSlurProps from './note/setNoteSlurProps'
import setNoteTieProps from './note/setNoteTieProps'
import setNoteCoordProps from './note/setNoteCoordProps'
import setNoteSizeProps from './note/setNoteSizeProps'
import setNoteDotProps from './note/setNoteDotProps'
import setNoteBeamProps from './note/setNoteBeamProps'
import setSingleNoteProps from './note/setSingleNoteProps'
import setChordNoteProps from './note/setChordNoteProps'
import setRestNoteProps from './note/setRestNoteProps'

interface ReturnData {
  measureList: Measure[]
  noteList: Note[]
  totalWidth: number
  totalDuration: number
}

/**
 * 解析数据
 */
export default function parseData(
  measureXML: MeasureXML[] = [],
  speed: number,
  bpmUnit: NoteType,
  minWidth: number
): ReturnData {
  const mList: Measure[] = []
  const nList: Note[] = []

  let globalBpm: number = 60 // 默认使用60
  let globalBeats: number
  let globalBeatType: number
  let globalCapo: number = 0

  let noteCount: number = 1 // 音符数量累计

  let totalWidth: number = 0 // 总宽度
  let totalDuration: number = 0 // 总时长

  measureXML.map((measure: MeasureXML, index: number) => {
    if (isEmpty(measure)) {
      return
    }

    const { _number, note, partId } = measure

    const bpm: number = getBpm(measure) || globalBpm
    const beats: number = getBeats(measure) || globalBeats
    const beatType: number = getBeatType(measure) || globalBeatType
    const capo: number = getCapo(measure) || globalCapo

    // 设置全局
    globalBpm = bpm
    globalBeats = beats
    globalBeatType = beatType
    globalCapo = capo

    let mWidth: number = 0 // 小节宽度
    let mDuration: number = 0 // 小节时长

    const mId: string = `M_${_number}` // 生成小节ID

    let notes: any = []

    if (isEmpty(note)) {
      notes = []
    } else if (isArray(note)) {
      notes = note
    } else if (isObject(note)) {
      notes = [note]
    }

    // 连音
    let slurTotal = 0 // 需合并数量
    let slurMerged = 0 // 已合并数量
    let slurType: SlurType = 'start' // 连音类型

    // 操作下一个音符
    const _toNext = (node) => {
      // 设置音符时间属性
      const duration = calNoteDuration(node, beats, beatType, bpm, bpmUnit, speed)
      node = setNoteTimeProps(node, mDuration, duration)
      mDuration += duration // 累计小节时长

      // 设置音符坐标属性
      node = setNoteCoordProps(node, mWidth)

      // 设置音符尺寸属性
      const width = calNoteWidth(node, beats, beatType, minWidth)
      node = setNoteSizeProps(node, width)

      mWidth += width
      totalWidth += width

      // 添加到音符列表
      nList.push(node)
      noteCount++
    }

    notes.map((subItem) => {
      let node: Note = { id: `N_${noteCount}`, measureId: mId }

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

      // 延长音
      if (hasTie(subItem)) {
        node = setNoteTieProps(node, subItem)
      }

      // 连音
      if (hasSlur(subItem)) {
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

        node = setNoteSlurProps(node, subItem, slurType)
      }

      // 附点
      const dotType = getDot(subItem)
      if (dotType) {
        node = setNoteDotProps(node, dotType)
      }

      // 时值横杆
      const beamType = getBeam(subItem)
      if (beamType) {
        node = setNoteBeamProps(node, beamType)
      }

      // 异常
      if (isEmpty(node)) {
        return
      }

      _toNext(node)
    })

    // 如果小节没有<note>，则自动补上一个全休止符
    if (isEmpty(notes)) {
      const node: Note = { id: `N_${noteCount}`, measureId: mId, type: 'whole', view: 'rest' }
      _toNext(node)
    }

    // 添加到小节列表
    let m: Measure = {
      id: mId,
      partId,
      bpm,
      beats,
      beatType,
      capo
    }

    m = setMeasureTimeProps(m, totalDuration, mDuration) // 设置小节时间属性
    m = setMeasureSizeProps(m, mWidth) // 设置小节尺寸属性
    m = setMeasureCoordProps(m, mWidth * index) // 设置小节坐标属性

    if (index + 1 === measureXML.length) { // 是否最后一小节
      m.isLast = true
    }

    mList.push(m)
    totalDuration += mDuration // 总时长
  })

  return {
    measureList: mList,
    noteList: nList,
    totalWidth,
    totalDuration
  }
}
