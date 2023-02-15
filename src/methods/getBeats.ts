/**
 * 每个小节有几个拍
 */
export default function getBeats(measureXML) {
  const { attributes } = measureXML
  return attributes?.time?.beats
}
