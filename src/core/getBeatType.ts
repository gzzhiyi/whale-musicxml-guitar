/**
 * 以哪种音符为一拍
 */
export default function getBeatType(measureXML: any): number {
  const { attributes } = measureXML
  return attributes?.time?.['beat-type'] || 0
}
