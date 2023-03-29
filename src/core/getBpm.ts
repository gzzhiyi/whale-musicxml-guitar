import { isArray } from 'lodash'

/**
 * 获取每分钟多少拍子
 */
export default function getBPM(measureXML: any): number {
  let { direction } = measureXML

  if (isArray(direction)) {
    [direction] = direction
  }

  let directionType: any = null

  if (isArray(direction?.['direction-type'])) {
    [directionType] = direction?.['direction-type']
  } else {
    directionType = direction?.['direction-type']
  }

  return directionType?.metronome?.['per-minute'] || 0
}
