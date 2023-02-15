import { isArray, isObject } from 'lodash'

export default function formatNotes(noteXML: any) {
  if (isArray(noteXML)) {
    const arr: any = []

    noteXML.map((item: any = {}) => {
      arr.push({
        string: item.string - 1, // MusicXML的string是从1开始
        fret: item.fret,
        step: item.step || '',
        octave: item.octave || ''
      })
    })

    return arr
  }

  if (isObject(noteXML)) {
    const o: any = noteXML

    return {
      string: o.string - 1, // MusicXML的string是从1开始
      fret: o.fret,
      step: o.step,
      octave: o.octave
    }
  }

  return []
}
