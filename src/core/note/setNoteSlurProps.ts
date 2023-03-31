import { Note, NoteXML, SlurType } from '../../types'

/**
 * 设置音符连音属性
 */
export default function setNoteSlurProps(note: Note, noteXML: NoteXML, slurType: SlurType): Note {
  const { 'time-modification': timeModification } = noteXML

  return {
    ...note,
    slur: {
      type: slurType,
      actualNotes: timeModification['actual-notes'],
      normalNotes: timeModification['normal-notes']
    }
  }
}
