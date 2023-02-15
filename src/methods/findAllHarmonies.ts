import { filter, isArray } from 'lodash'
import { Measure, Harmony } from '../types'

export default function findAllHarmonies(measures: Measure[]): Harmony[] {
  const arr: any = []

  measures = filter(measures, 'harmony')
  measures.map((item: Measure) => {
    const { harmony } = item

    if (isArray(harmony)) {
      harmony.map((item) => {
        arr.push(item)
      })
      return
    }

    arr.push(harmony)
  })

  return arr
}
