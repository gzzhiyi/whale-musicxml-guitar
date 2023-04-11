import { Note } from '../../types'

/**
 * 设置音符时间属性
 */
export default function setNoteTimeProps(note: Note, start: number, duration: number): Note {
  return {
    ...note,
    time: {
      start,
      duration,
      end: start + duration
    }
  }
}
