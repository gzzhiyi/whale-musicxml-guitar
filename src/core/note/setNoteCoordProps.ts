import { Note } from '../../types'
/**
 * 设置音符延长音属性
 */
export default function setNoteCoordProps(note: Note, x: number): Note {
  return {
    ...note,
    coord: { x }
  }
}
