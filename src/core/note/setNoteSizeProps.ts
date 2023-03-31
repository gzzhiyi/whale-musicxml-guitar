import { Note } from '../../types'

/**
 * 设置音符尺寸属性
 */
export default function setNoteSizeProps(note: Note, width: number): Note {
  return { ...note, size: { width } }
}
