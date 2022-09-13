import {
  isArray,
  isObject
} from 'lodash'

export default function findAllParts(xml: string) {
  const partwise = xml['score-partwise']
  const part = partwise.part

  if (isArray(part)) {
    return part
  }

  if (isObject(part)) {
    return [part]
  }

  return [];
}
