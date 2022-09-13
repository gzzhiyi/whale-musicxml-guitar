import { last } from 'lodash'

export default function getScoreDuration(timeline) {
  const o: any = last(timeline)
  return o?.endTime
}
