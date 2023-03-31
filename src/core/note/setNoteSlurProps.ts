import { NoteXML, SlurType, SlurProps } from '../../types'

/**
 * 设置音符连音属性
 */
export default function setNoteSlurProps(noteXML: NoteXML, slurType: SlurType): SlurProps {
  const { 'time-modification': timeModification } = noteXML

  return {
    type: slurType,
    actualNotes: timeModification['actual-notes'],
    normalNotes: timeModification['normal-notes']
  }
}
