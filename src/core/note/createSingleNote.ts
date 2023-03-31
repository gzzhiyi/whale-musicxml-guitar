import { NoteXML, Note } from '../../types'
import { hasDot } from '../validate'

/**
 * 生成单音符
 */
export default function createSingleNote(id: string, measureId: string, noteXML: NoteXML): Note {
  const { type, notations } = noteXML
  const { fret, string } = notations?.technical || {}

  return {
    id,
    measureId,
    type,
    view: 'single',
    data: {
      string: string || 0 ,
      fret: fret || 0
    }, // MusicXML的string是从1开始
    dot: hasDot(noteXML)
  }
}
