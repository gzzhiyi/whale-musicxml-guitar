import { NoteType } from '../types'

/**
 * 数字转成音符类型
 */
export default function numberToNoteType(num: number): NoteType {
  const types = {
    1: 'whole',
    2: 'half',
    4: 'quarter',
    8: 'eighth',
    16: '16th',
    32: '32th',
    64: '64th',
    128: '128th',
    256: '256th',
    512: '512th',
    1024: '1024th'
  }

  return types[num];
}
