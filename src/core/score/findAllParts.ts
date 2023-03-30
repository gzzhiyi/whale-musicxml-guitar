import { isArray, isObject } from 'lodash'

/**
 * 查找所有<part>
 * @param {!any} xml
 * @return {any[]}
 */
export default function findAllParts(xml: any): any[] {
  try {
    const partwise = xml?.['score-partwise']
    const { part } = partwise

    if (isArray(part)) {
      return part
    }

    if (isObject(part)) {
      return [part]
    }

    return [];
  } catch (err) {
    console.error(err)
    return [];
  }
}
