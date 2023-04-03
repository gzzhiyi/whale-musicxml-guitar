import { isArray, isObject } from 'lodash'
import { MeasureXML } from '../../types'

function getMeasure(measureXML: MeasureXML | MeasureXML[], partId: string): MeasureXML[] {
  if (isArray(measureXML)) {
    const arr: any = []

    measureXML.map((item: any) => {
      const o = { partId }

      if (isObject(item)) {
        arr.push({ ...o, ...item })
      } else {
        arr.push({ o })
      }
    })

    return arr
  }

  if (isObject(measureXML)) {
    return [measureXML]
  }

  return []
}

/**
 * 查找所有<measure>
 * @param {!any} partsXML
 */
export default function findAllMeasures(partsXML: any): any[] {
  let arr = []
  partsXML.map((item: any) => {
    const measure: any = getMeasure(item.measure, item._id)
    arr = arr.concat(measure)
  })

  return arr
}
