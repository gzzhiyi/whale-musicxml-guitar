import { NoteXML, SlurProps } from '../../types'

/**
 * 设置音符延长音属性
 */
export default function setNoteTieProps(noteXML: NoteXML): SlurProps | {} {
  const { notations } = noteXML

  if (!notations?.tied) {
    return {}
  }

  const { _type } = notations.tied

  return {
    tie: {
      type: _type
    }
  }
}
