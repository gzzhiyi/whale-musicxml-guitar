import { isArray, isObject } from 'lodash'

/**
 * 判断是否六线谱
 */
function isTAB(measureXML) {
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

function getMeasure(measureXML, partId) {
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

export default function findAllMeasures(partsXML) {
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
