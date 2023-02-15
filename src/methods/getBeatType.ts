/**
 * 以哪种音符为一拍
 */
export default function getBeatType(measureXML) {
  const { attributes } = measureXML;
  return attributes?.time?.['beat-type'];
}
