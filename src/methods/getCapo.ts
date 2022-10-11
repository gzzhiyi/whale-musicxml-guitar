export default function getCapo(measureXML: any) {
  const { attributes } = measureXML
  return attributes?.['staff-details']?.capo
}
