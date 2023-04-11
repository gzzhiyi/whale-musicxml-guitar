import { Note } from '../../types'
import numberToNoteType from './numberToNoteType'

const NoteMap = {
  'whole': 64,
  'half': 32,
  'quarter': 16,
  'eighth': 8,
  '16th': 4,
  '32th': 2,
  '64th': 1
}

/**
 * 计算音符坐标
 */
export default function calNoteWidth(note: Note, beats: number, beatType: number, widthUnit: number): number {
  const { view, type, dot } = note

  if (!type) {
    return 0
  }

  let width = 0
  if (view === 'rest' && type === 'whole') { // 全休止符处理
    width = beats * NoteMap[numberToNoteType(beatType)] * widthUnit
  } else {
    width = widthUnit * NoteMap[type]
  }

  switch(dot) {
  case 'dot':
    width *= 1.5
    break
  case 'doubleDot':
    width *= 1.75
    break
  }

  return width
}
