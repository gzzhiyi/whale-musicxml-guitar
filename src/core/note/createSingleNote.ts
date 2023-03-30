import { Note } from '../../types'
import { hasDot } from '../validate'

/**
 * 生成单音符
 */
export default function createSingleNote(id: string, measureId: string, noteXML: any): Note {
  const { type, notations, pitch } = noteXML
  const { fret, string } = notations.technical || {}
  const { step, octave, alter } = pitch

  return {
    id,
    measureId,
    type,
    view: 'single',
    data: {
      string, // MusicXML的string是从1开始
      fret,
      step: alter ? `${step}#` : step,
      octave
    },
    dot: hasDot(noteXML)
  }
}
