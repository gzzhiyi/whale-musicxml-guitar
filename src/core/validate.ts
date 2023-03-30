import { DotType } from '../types'
import { isArray, isEmpty, has } from 'lodash'

/**
 * 是否TAB音符
 */
export function isTabNote(noteXML): boolean {
  const { notations } = noteXML

  return !isEmpty(notations) && !isEmpty(notations.technical)
}

/**
 * 是否休止符
 */
export function isRest(noteXML): boolean {
  return has(noteXML, 'rest')
}

/**
 * 是否和弦音符
 */
export function isChord(noteXML): boolean {
  return has(noteXML, 'chord')
}

/**
 * 延音线判断
 */
export function hasTie(noteXML): boolean {
  return has(noteXML, 'tie')
}

/**
 * 连音判断
 */
export function hasSlur(noteXML): boolean {
  return has(noteXML, 'time-modification')
}

/**
 * 是否附点
 */
export function hasDot(noteXML): DotType {
  if (!has(noteXML, 'dot')) {
    return ''
  }

  if (isArray(noteXML.dot) && noteXML.dot.length >= 2) {
    return 'doubleDot'
  }

  return 'dot'
}
