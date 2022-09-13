import {
  isArray,
  isEmpty,
  isObject
} from 'lodash'

function findTab(clef) {
  let config = {}

  if (isArray(clef)) {
    clef.map((o) => {
      if (o?.sign !== 'TAB') {
        return
      }

      const { line, sign, _number } = o
      config = {
        line,
        sign,
        number: _number
      }
    })
  } else if (isObject(clef)) {
    const o: any = clef
    const { line, sign } = o
    config = {
      line,
      sign
    }
  }

  return config
}

export default function getClef(measureXML: any, type: string = 'TAB') {
  let config = {}

  measureXML.map((item: any) => {
    const { attributes } = item

    if (!attributes) {
      return
    }

    const { clef } = attributes

    if (isEmpty(clef)) {
      return
    }

    if (type === 'TAB') {
      config = findTab(clef)
    }
  })

  return config
}
