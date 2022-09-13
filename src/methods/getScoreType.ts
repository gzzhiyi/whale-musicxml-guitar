import { isEmpty } from 'lodash'

export default function getScoreType(xml: any) {
  if (!isEmpty(xml['score-partwise'])) {
    return 'partwise'
  }

  if (!isEmpty(xml['score-timewise'])) {
    return 'timewise'
  }

  return 'unkonw'
}
