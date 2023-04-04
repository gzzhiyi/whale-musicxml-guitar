import { Note, DotType } from '../../types'

/**
 * 设置音符附点属性
 */
export default function setNoteDotProps(note: Note, type: DotType): Note {
  return {
    ...note,
    dot: type
  }
}
