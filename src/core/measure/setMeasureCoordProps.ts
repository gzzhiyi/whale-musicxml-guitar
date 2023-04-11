import { Measure } from '../../types'
/**
 * 设置音符延长音属性
 */
export default function setMeasureCoordProps(measure: Measure, x: number): Measure {
  return {
    ...measure,
    coord: { x }
  }
}
