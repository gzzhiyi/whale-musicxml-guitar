import { Note, BeamType } from '../../types'

/**
 * 设置音符延长音属性
 */
export default function setNoteBeamProps(note: Note, type: BeamType): Note {
  return {
    ...note,
    beam: type
  }
}
