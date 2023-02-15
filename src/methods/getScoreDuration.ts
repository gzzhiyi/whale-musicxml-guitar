import { last } from 'lodash'

export default function getScoreDuration(timeline: any): number {
  const o: any = last(timeline)
  return o?.endTime || 0
}
