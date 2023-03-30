import { isEmpty } from 'lodash'
import { ScoreType } from '../../types'

export default function getScoreType(xml: any): ScoreType {
  if (!isEmpty(xml['score-partwise'])) {
    return 'partwise'
  }

  if (!isEmpty(xml['score-timewise'])) {
    return 'timewise'
  }

  return ''
}
