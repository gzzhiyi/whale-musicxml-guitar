import { Note } from '../../types'
import { hasDot } from '../validate'

/**
 * 生成休止符
 */
export default function createRestNote(id: string, measureId: string, noteXML: any): Note {
  const { type } = noteXML

  return {
    id,
    measureId,
    type,
    view: 'rest',
    data: null,
    dot: hasDot(noteXML)
  }
}
