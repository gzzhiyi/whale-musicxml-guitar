import { Note } from '../../types'
import { hasDot } from '../validate'
import getChordName from './getChordName'

/**
 * 生成和弦音符
 */
export default function createChordNote(noteXML: any, lastNode: any): Note {
  const { notations, pitch } = noteXML
  const { fret, string } = notations.technical
  const { step, octave, alter } = pitch

  const nodeData = {
    string, // MusicXML的string是从1开始
    fret,
    step: alter ? `${step}#` : step,
    octave
  }

  if (lastNode.view === 'chord') { // 如果前一个节点是和弦类型，则直接做添加处理
    lastNode.data.push(nodeData)
    lastNode.name = getChordName(lastNode.data)
    return lastNode
  }

  return {
    id: lastNode.id,
    measureId: lastNode.measureId,
    type: lastNode.type,
    view: 'chord',
    name: '',
    data: [lastNode.data, nodeData],
    dot: lastNode.dot || hasDot(noteXML)
  }
}