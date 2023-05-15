import { Note } from '../../types'

/**
 * 设置音符时间属性
 */
export default function setNoteTimeProps(note: Note, start: number, duration: number): Note {
  const offsetVal: number = Math.floor(duration * 0.2) // 偏移值
  const endTime: number = start + duration
  const startRange: number = start - offsetVal > 0 ? start - offsetVal : start
  const endRang: number = endTime - offsetVal > 0 ? endTime - offsetVal : endTime

  return {
    ...note,
    time: {
      start,
      startRange,
      duration,
      end: start + duration,
      endRang
    }
  }
}
