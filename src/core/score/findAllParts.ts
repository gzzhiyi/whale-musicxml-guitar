import { find, filter, isEmpty, isArray, isObject } from 'lodash'

/**
 * 过滤对应的<part-list>
 */
function filterPartList(data): any[] {
  const programs = [24, 25, 26, 27, 28, 29, 30, 31] // 参考MIDI 128音色表

  if (isArray(data)) {
    return filter(data, (item) => programs.includes(item?.['midi-instrument']?.['midi-program']))
  }

  if (isObject(data)) {
    return programs.includes(data?.['midi-instrument']?.['midi-program']) ? [data] : []
  }

  return []
}

/**
 * 通过<part-list>取出对应的<part>
 */
function filterPart(part, partList) {
  const arr: any[] = []
  partList.map(item => {
    const { _id } = item

    let o: any = null
    if (isArray(part)) {
      o = find(part, { _id })
    } else if (isObject(part) && part?.['_id'] === _id) {
      o = part
    }

    o && arr.push(o)
  })

  return arr
}

/**
 * 查找所有<part>
 * @param {!any} xml
 * @return {any[]}
 */
export default function findAllParts(xml: any): any[] {
  const partwise = xml?.['score-partwise']
  const partList = filterPartList(partwise?.['part-list']?.['score-part'] || [])

  if (isEmpty(partList)) {
    return []
  }

  return filterPart(partwise.part, partList)
}
