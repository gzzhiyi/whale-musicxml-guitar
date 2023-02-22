/**
 * 每个小节有几个拍
 */
export default function getBeats(measureXML: any): number {
  const { attributes } = measureXML
  return attributes?.time?.beats || 0
}
