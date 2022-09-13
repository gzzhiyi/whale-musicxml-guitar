import { isEmpty } from 'lodash'

export default function getClef(measures: any) {
  let config = {}

  measures.map((item: any) => {
    const { attributes } = item

    if (!attributes) {
      return
    }

    const { clef } = attributes

    if (isEmpty(clef)) {
      return;
    }

    const { line, sign } = clef

    config = { line, sign }
  })

  return config
}
