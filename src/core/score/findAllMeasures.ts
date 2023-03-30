import { isArray, isObject } from 'lodash'
import { MeasureXML } from '../../types'

/**
 * 判断是否六线谱
 */
function isTAB(measureXML: MeasureXML | MeasureXML[]): boolean {
  if (isArray(measureXML)) {
    measureXML = measureXML[0]
  }

  const clef: any = measureXML?.attributes?.clef

  let res = false

  if (isArray(clef)) {
    clef.map((item) => {
      if (item?.sign === 'TAB') {
        res = true
      }
    })
  } else if (isObject(clef)) {
    const c: any = clef
    res = c.sign === 'TAB'
  }

  return res
}

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
    if (!isTAB(item.measure)) {
      return
    }

    const measure: any = getMeasure(item.measure, item._id)
    arr = arr.concat(measure)
  })

  return arr
}
