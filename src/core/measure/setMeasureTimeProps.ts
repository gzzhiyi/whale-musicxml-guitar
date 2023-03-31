import { Measure } from '../../types'

/**
 * 设置小节时间属性
 */
export default function setMeasureTimeProps(measure: Measure, start: number, duration: number): Measure {
  return { ...measure, time: { start, duration } }
}
