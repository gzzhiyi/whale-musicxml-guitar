import { Measure } from '../../types'

/**
 * 设置小节时间属性
 */
export default function setMeasureSizeProps(measure: Measure, width: number): Measure {
  return { ...measure, size: { width } }
}
