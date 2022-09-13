import { isEmpty } from 'lodash'

export default function findAllNotes(measures: []) {
  let arr = [];

  measures.map((item: any) => {
    if (!isEmpty(item.note)) {
      arr = arr.concat(item.note)
    }
  })

  return arr
}
