import { filter, isArray } from 'lodash'
import { MeasureXML, HarmonyXML } from '../../types'

/**
 * 查找所有<harmony>
 * @param {!MeasureXML[]} measureXML
 */
export default function findAllHarmonies(measureXML: MeasureXML[]): HarmonyXML[] {
  const arr: any = []
  const measures = filter(measureXML, 'harmony') // 提取带有<harmony>标记的小节

  measures.map((item: MeasureXML) => {
    const { _number, harmony } = item

    if (isArray(harmony)) {
      harmony.map((subItem) => {
        arr.push({ ...subItem, measureId: `M_${_number}` })
      })
      return
    }

    arr.push({ ...harmony, measureId: `M_${_number}` })
  })

  return arr
}
