import { isArray, isObject } from 'lodash'

/**
 * 格式化音符数据格式
 */
export default function formatNoteData(noteXML: any): any {
  if (isArray(noteXML)) {
    const arr: any = []

    noteXML.map((item: any = {}) => {
      const { string, fret, step, octave } = item

      arr.push({
        string, // MusicXML的string是从1开始
        fret,
        step: step || 0,
        octave: octave || ''
      })
    })

    return arr
  }

  if (isObject(noteXML)) {
    const o: any = noteXML
    const { string, fret, step, octave } = o

    return {
      string,
      fret,
      step: step || 0,
      octave: octave || ''
    }
  }

  return []
}
