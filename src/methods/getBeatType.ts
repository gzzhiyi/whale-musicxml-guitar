import { NoteTypeValue } from '../types'

/**
 * 以哪种音符为一拍
 */
export default function getBeatType(measureXML): NoteTypeValue {
  const { attributes } = measureXML;
  return attributes?.time?.['beat-type'] || 4;
}
