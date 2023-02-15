import { NoteTypeNumber } from '../types'

/**
 * 每个小节有几个拍
 */
export default function getBeats(measureXML: any): NoteTypeNumber {
  const { attributes } = measureXML
  return attributes?.time?.beats || 4
}
