import { has, isArray } from 'lodash'
import {
  Beam,
  Dot,
  Notations,
  Note as NoteT,
  NoteData,
  NoteType,
  NoteView,
  NoteXML,
  Slur,
  Stem,
  Tied,
  Time,
  TimeModification,
  Tuplet
} from '@/types'

type PropsType = {
  id: string
  xmlData: NoteXML
}

interface NoteInterface extends NoteT {
  appendData(data: NoteData): void
  getData(noteXML: NoteXML): NoteData | null
}

export default class Note implements NoteInterface {
  public beam: Beam[] | null
  public data: NoteData[] | null = null
  public dot: Dot | null = null
  public id: string
  public notations: Notations
  public stem: Stem | null = null
  public time: Time | null = null
  public timeModification: TimeModification | null
  public type: NoteType
  public view: NoteView

  constructor ({ id, xmlData }: PropsType) {
    this.beam = this.getBeam(xmlData)
    this.dot = this.getDot(xmlData)
    this.id = id
    this.notations = this.getNotations(xmlData)
    this.stem = this.getStem(xmlData)
    this.timeModification = this.getTimeModification(xmlData)
    this.type = this.getType(xmlData)
    this.view = this.getView(xmlData)
  }

  private getBeam(noteXML: NoteXML): Beam[] | null {
    const beam = noteXML.beam
    if (!beam) return null

    return isArray(beam) ? beam.map(item => item['#text']) : [beam['#text']]
  }

  getData(noteXML: NoteXML): NoteData | null {
    const technical = noteXML?.notations?.technical
    if (!technical) return null

    const { fret, string } = technical
    const { alter = null, octave = null, step = null } = noteXML.pitch || {}

    return {
      fret,
      pitch: { alter, octave, step },
      string
    }
  }

  private getDot(noteXML: NoteXML): Dot | null {
    const dot = noteXML.dot
    return dot ? (isArray(dot) && dot.length >= 2 ? 'doubleDot' : 'dot') : null
  }

  private getView(noteXML: NoteXML): NoteView {
    return has(noteXML, 'rest') ? 'rest' : 'single'
  }

  private getNotations(noteXML: NoteXML): Notations {
    return {
      slur: this.getSlur(noteXML),
      tied: this.getTied(noteXML),
      tuplet: this.getTuplet(noteXML)
    }
  }

  private getSlur(noteXML: NoteXML): Slur {
    return noteXML.notations?.slur?._type ?? null
  }

  private getStem(noteXML: NoteXML): Stem {
    return noteXML.stem ?? null
  }

  private getTied(noteXML: NoteXML): Tied[] | null {
    const tied = noteXML.notations?.tied
    if (!tied) return null

    return isArray(tied) ? tied.map(item => item._type) : [tied._type]
  }

  private getTimeModification(noteXML: NoteXML): TimeModification | null {
    const timeMod = noteXML['time-modification']
    if (!timeMod) return null

    const { 'actual-notes': actualNotes, 'normal-notes': normalNotes } = timeMod
    return actualNotes && normalNotes ? { actualNotes, normalNotes } : null
  }

  private getTuplet(noteXML: NoteXML): Tuplet[] | null {
    const tuplet = noteXML.notations?.tuplet
    if (!tuplet) return null

    return isArray(tuplet) ? tuplet.map(item => item._type) : [tuplet._type]
  }

  private getType(noteXML: NoteXML): NoteType {
    return noteXML.type
  }

  appendData(data: NoteData) {
    if (!this.data) {
      this.data = []
    }

    this.data?.push(data)
  }

  appendTime(start: number, duration: number) {
    this.time = { start, duration, end: start + duration }
  }
}