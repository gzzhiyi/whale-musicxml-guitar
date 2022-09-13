import { isArray } from 'lodash'

/**
 * 获取每分钟多少拍子
 */
export default function getBPM(measureXML) {
  let { direction } = measureXML

  if (isArray(direction)) {
    [direction] = direction
  }

  return direction?.['direction-type']?.metronome?.['per-minute']
}
