import { NoteTypeValue } from '../types'

/**
 * 每个小节有几个拍
 */
export default function getBeats(measureXML): NoteTypeValue {
  const { attributes } = measureXML
  return attributes?.time?.beats || 4
}
