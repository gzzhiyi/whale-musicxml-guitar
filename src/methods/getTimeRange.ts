/**
 * 获取时间范围
 */
export default function getTimeRange(time) {
  return time - Math.floor(time * 0.2)
}
