import { isEmpty } from 'lodash'
import { Note, NoteXML } from '../../types'
import { hasDot } from '../validate'

/**
 * 生成单音符
 */
export default function createSingleNote(note: Note, noteXML: NoteXML): Note {
  const { type, notations } = noteXML

  if (isEmpty(notations) || isEmpty(notations?.technical)) {
    return note
  }

  const { fret, string } = notations.technical

  return {
    ...note,
    type,
    view: 'single',
    data: {
      string: string || 0 ,
      fret: fret || 0
    }, // MusicXML的string是从1开始
    dot: hasDot(noteXML)
  }
}
