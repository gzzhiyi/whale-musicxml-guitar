import {
  filter,
  isArray
} from 'lodash'

export default function findAllHarmonies(measures: any) {
  const arr: any = []

  measures = filter(measures, 'harmony')
  measures.map((item) => {
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
