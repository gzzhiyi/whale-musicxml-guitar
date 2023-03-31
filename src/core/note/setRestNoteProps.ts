import { Note, NoteXML } from '../../types'
import { hasDot } from '../validate'

/**
 * 生成休止符
 */
export default function setRestNoteProps(note: Note, noteXML: NoteXML): Note {
  const { type } = noteXML

  return {
    ...note,
    type,
    view: 'rest',
    dot: hasDot(noteXML)
  }
}
