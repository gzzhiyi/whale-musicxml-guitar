import { HarmonyXML, Harmony } from '../../types'
import formatNoteData from '../note/formatNoteData'
import getChordName from '../note/getChordName'

/**
 * 去重
 */
function uniq(arr: any) {
  let [tempId, tempName] = ''

  const tempArr: any = []

  arr.map((item) => {
    const { measureId, name } = item

    if (measureId === tempId && name === tempName) {
      return
    }

    tempId = measureId
    tempName = name

    tempArr.push(item)
  })

  return tempArr
}

/**
 * 每个小节有几个拍
 */
export default function getHarmonies(harmonyXML: HarmonyXML[]): Harmony[] {
  const arr: any = []

  harmonyXML.map((item) => {
    const { frame, measureId } = item
    const notes = formatNoteData(frame['frame-note'])

    arr.push({
      measureId,
      name: getChordName(notes),
      firstFret: frame['first-fret'] || 1,
      data: notes
    })
  })

  return uniq(arr)
}
