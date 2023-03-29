import { isArray, isObject } from 'lodash'

export default function findAllParts(xml: string): any {
  const partwise = xml['score-partwise']
  const { part } = partwise

  if (isArray(part)) {
    return part
  }

  if (isObject(part)) {
    return [part]
  }

  return [];
}
