import {
  isEmpty,
  filter,
  find
} from 'lodash'

export default function getMeasureDuration(measureId: string, notes: any, timeline: any): number {
  const n = filter(notes, { measureId })

  let addup = 0
  n.map((item) => {
    const t = find(timeline, { nodeId: item.id })

    if (!isEmpty(t)) {
      addup += t.duration
    }
  })

  return addup
}
