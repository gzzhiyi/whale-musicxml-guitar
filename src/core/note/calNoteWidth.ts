import { Note } from '../../types'

/**
 * 计算音符坐标
 */
export default function calNoteWidth(note: Note, minWidth: number): number {
  if (!note.type) {
    return 0
  }

  const map = {
    'whole': minWidth * 64,
    'half': minWidth * 32,
    'quarter': minWidth * 16,
    'eighth': minWidth * 8,
    '16th': minWidth * 4,
    '32th': minWidth * 2,
    '64th': minWidth
  }

  const { type, dot } = note

  let width = map[type]

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
