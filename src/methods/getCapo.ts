/**
 * 获取变调夹位置
 */
export default function getCapo(measureXML: any): number {
  const { attributes } = measureXML
  return attributes?.['staff-details']?.capo
}
