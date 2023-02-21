import formatNotes from './formatNotes'

/**
 * 获取和弦名称
 */
function getName(root, kind) {
  const abbrs = {
    major: '',
    minor: 'm',
    augmented: 'aug',
    diminished: 'dim',
    dominant: '7',
    'suspended-second': 'sus2',
    'suspended-fourth': 'sus4',
    'major-sixth': '6',
    'major-seventh': 'maj7',
    'major-ninth': 'maj9',
    'minor-sixth': 'm6',
    'minor-seventh': 'm7',
    'major-minor': 'm(maj7)',
    // { 'other': 'ø' },
    'diminished-seventh': 'dim7',
    other: 'maj7(#5)',
    // { 'suspended-second': '7sus2' },
    // { 'suspended-fourth': '7sus4' },
    // { 'suspended-second': 'maj7sus2' },
    // { 'suspended-fourth': 'maj7sus4' },
    power: '5'
  }

  return `${root?.['root-step'] || ''}${root?.['root-alter'] === 1 ? '#' : ''}${abbrs[kind] || ''}` || '';
}

/**
 * 去重
 */
function uniq(arr: any) {
  let [tempId, tempName] = ''

  const tempArr: any = []

  arr.map((item) => {
    const { measureId, name } = item

    if (measureId === tempId && name === tempName) {
      return
    }

    tempId = measureId
    tempName = name

    tempArr.push(item)
  })

  return tempArr
}

/**
 * 每个小节有几个拍
 */
export default function getHarmonies(harmonyXML: any): object[] {
  const arr: any = []

  harmonyXML.map((item) => {
    const { root, kind, frame, measureId } = item

    arr.push({
      measureId,
      name: getName(root, kind),
      firstFret: frame['first-fret'] || 1,
      data: formatNotes(frame['frame-note'])
    })
  })

  return uniq(arr)
}
