import { NoteTypeString } from '../types'

/**
 * 音符类型转成数字
 */
export default function noteTypeToNumber(type: NoteTypeString): number {
  const types = {
    'whole': 1,
    'half': 2,
    'quarter': 4,
    'eighth': 8,
    '16th': 16,
    '32th': 32,
    '64th': 64,
    '128th': 128,
    '256th': 256,
    '512th': 512,
    '1024th': 1024
  }

  return types[type];
}
