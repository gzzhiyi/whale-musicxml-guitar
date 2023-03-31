import { isEmpty } from 'lodash'
import { NoteType } from '../../types'
import noteTypeToNumber from './noteTypeToNumber'

/**
 * 计算音符时长
 */
export default function calNoteDuration(node, bpm: number, bpmUnit: NoteType) {
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