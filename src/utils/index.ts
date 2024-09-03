import { NoteType } from '@/types'

/**
 * 音符类型转成数字
 */
export function noteTypeToNumber(type: NoteType): number {
  const types = {
    'whole': 1,
    'half': 2,
    'quarter': 4,
    'eighth': 8,
    '16th': 16,
    '32nd': 32,
    '64th': 64
  }

  if (!types[type]) {
    console.warn(`Note type [${type}] is invalid.`);
  }

  return types[type];
}

/**
 * 数字转成音符类型
 */
export function numberToNoteType(num: number): NoteType {
  const types = {
    1: 'whole',
    2: 'half',
    4: 'quarter',
    8: 'eighth',
    16: '16th',
    32: '32nd',
    64: '64th'
  }

  if (!types[num]) {
    console.warn(`Note type [${num}] is invalid.`);
  }

  return types[num];
}
