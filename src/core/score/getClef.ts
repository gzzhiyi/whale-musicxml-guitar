import { isArray, isEmpty, isObject } from 'lodash'
import { Clef, MeasureXML } from '../../types'

/**
 * Find tab from clef
 */
function findTab(clef: any): any {
  let config: any

  if (isArray(clef)) {
    clef.map((o) => {
      if (o?.sign !== 'TAB') {
        return null
      }

      const { line, sign, _number } = o
      config = { line, sign, number: _number }
    })
  } else if (isObject(clef)) {
    const o: any = clef
    const { line, sign } = o
    config = { line, sign }
  }

  return config
}

/**
 * 获取谱号信息
 */
export default function getClef(measureXML: MeasureXML[]): Clef | null {
  let config: any

  measureXML.map((item: any) => {
    const { attributes } = item

    if (!attributes) {
      return
    }

    const { clef } = attributes

    if (isEmpty(clef)) {
      return
    }

    config = findTab(clef)
  })

  return config
}
