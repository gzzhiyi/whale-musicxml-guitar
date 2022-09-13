/**
 * 音符类型转成数字
 */
export default function noteTypeToNumber(type) {
  const types = {
    'whole': 1,
    'half': 2,
    'quarter': 4,
    'eighth': 8,
    '16th': 16,
    '32th': 32,
    '64th': 64
  }

  return types[type] || '';
}
