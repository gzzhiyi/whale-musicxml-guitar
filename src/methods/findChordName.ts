import {
  find,
  isEmpty
} from 'lodash'

function formatNoteData(data) {
  const arr: any = []

  data.map((item) => {
    const { string, fret } = item
    arr.push({ string, fret })
  })

  return arr
}

export default function findChordName(notes: any = [], harmonies: any = []) {
  if (isEmpty(notes) || isEmpty(harmonies)) {
    return notes
  }

  notes.map((note) => {
    if (note.view === 'chord') {
      const o = find(harmonies, { 'data': formatNoteData(note.data) })
      note.name = o.name
    }
  })

  return notes
}
