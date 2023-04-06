import { hasIn, isArray, isObject } from 'lodash'

function hasPerMinute(item: any) {
  return hasIn(item, 'direction-type.metronome.per-minute')
}

/**
 * 获取每分钟多少拍子
 */
export default function getBpm(measureXML: any): number {
  const { direction } = measureXML
  let bpm = 0

  if (isArray(direction)) {
    direction.map((item) => {
      if (hasPerMinute(item)) {
        bpm = item['direction-type'].metronome['per-minute']
      }
    })
  } else if (isObject(direction) && hasPerMinute(direction)) {
    bpm = direction['direction-type'].metronome['per-minute']
  }

  return bpm
}
