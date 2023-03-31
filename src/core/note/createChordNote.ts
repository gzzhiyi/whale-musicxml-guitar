import { isArray, isObject } from 'lodash'
import { NoteXML, Note } from '../../types'
import { hasDot } from '../validate'
import getChordName from './getChordName'

/**
 * 生成和弦音符
 */
export default function createChordNote(noteXML: NoteXML, lastNode: Note): Note | null {
  const { notations } = noteXML

  if (!isObject(notations) || !notations.technical || !lastNode.data) {
    return null
  }

  const { fret, string } = notations.technical
  const nodeData = { string, fret } // MusicXML的string是从1开始

  if (lastNode.view === 'chord' && isArray(lastNode.data)) { // 如果前一个节点是和弦类型，则直接做添加处理
    lastNode.data.push(nodeData)
    lastNode.name = getChordName(lastNode.data)
    return lastNode
  }

  let data: any[] = []
  if (isArray(lastNode.data)) {
    data = [...lastNode.data, nodeData]
  } else if (isObject(lastNode.data)) {
    data = [lastNode.data, nodeData]
  }

  return {
    id: lastNode.id,
    measureId: lastNode.measureId,
    type: lastNode.type,
    view: 'chord',
    name: '',
    data,
    dot: lastNode.dot || hasDot(noteXML)
  }
}
