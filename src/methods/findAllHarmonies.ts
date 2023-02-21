import { filter, isArray } from 'lodash'
import { Measure, Harmony } from '../types'

export default function findAllHarmonies(measures: Measure[]): Harmony[] {
  const arr: any = []

  measures = filter(measures, 'harmony')
  measures.map((item: Measure) => {
    const { _number, harmony } = item

    if (isArray(harmony)) {
      harmony.map((subItem) => {
        arr.push({ ...subItem, measureId: `M_${_number}` })
      })
      return
    }

    arr.push({ ...harmony, measureId: `M_${_number}` })
  })

  return arr
}
