import { Note, NoteXML } from '../../types'
/**
 * 设置音符延长音属性
 */
export default function setNoteTieProps(note: Note, noteXML: NoteXML): Note {
  const { notations } = noteXML

  if (!notations?.tied) {
    return note
  }

  const { _type } = notations.tied

  return {
    ...note,
    tie: {
      type: _type
    }
  }
}
