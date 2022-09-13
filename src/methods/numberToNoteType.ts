/**
 * 数字转成音符类型
 */
export default function numberToNoteType(num) {
  const types = {
    1: 'whole',
    2: 'half',
    4: 'quarter',
    8: 'eighth',
    16: '16th',
    32: '32th',
    64: '64th'
  }

  return types[num] || '';
}
