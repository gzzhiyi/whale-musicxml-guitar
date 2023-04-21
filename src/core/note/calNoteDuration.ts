import { isEmpty } from 'lodash'
import { Note, NoteType } from '../../types'
import noteTypeToNumber from './noteTypeToNumber'

/**
 * 计算音符时长
 */
export default function calNoteDuration(note: Note, beats: number, beatType: number, bpm: number, bpmUnit: NoteType, speed: number): number {
  const { view, type, slur, dot } = note

  if (!type) {
    return 0
  }

  const beatTime = Math.floor(60 / bpm / (beatType / noteTypeToNumber(bpmUnit)) * 1000) // 计算一节拍时值

  let duration = 0
  if (view === 'rest' && type === 'whole') { // 全休止符处理
    duration = beatTime * beats
  } else {
    duration = (beatType / noteTypeToNumber(type)) * beatTime
  }

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

  return Math.round(duration / speed)
}
