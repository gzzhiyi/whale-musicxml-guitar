import { find } from 'lodash'

/**
 * 获取音符持续时间
 */
export default function getNoteDuration(nodeId, timeline) {
  const o = find(timeline, { nodeId })
  return o?.duration || 0
}
