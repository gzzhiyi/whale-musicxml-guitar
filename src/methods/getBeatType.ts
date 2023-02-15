import { NoteTypeNumber } from '../types'

/**
 * 以哪种音符为一拍
 */
export default function getBeatType(measureXML: any): NoteTypeNumber {
  const { attributes } = measureXML
  return attributes?.time?.['beat-type'] || 4
}
