import { has, isArray, isEmpty } from 'lodash'
import { noteTypeToNumber } from '@/utils'
import getChordName from '@/utils/getChordName'
import {
  MeasureXML,
  NoteXML,
  Harmony,
  Metronome,
  Note,
  TimeSignature,
  Technical,
  Time
} from '@/types'
import NoteClass from '@/classes/Note'

type PropsType = {
  id: string
  xmlData: MeasureXML
  startTime: number
  beatUnit: number
  bpm: number
  beats: number
  beatType: number
  isLast: boolean
  speed: number
}

export default class Measure {
  public id: string
  public capo: number
  public harmonies: Harmony[]
  public metronome: Metronome
  public notes: Note[]
  public number: string
  public isLast: boolean
  public time: Time | null = null
  public timeSignature: TimeSignature

  private startTime: number
  private speed: number

  constructor({
    id,
    xmlData,
    startTime,
    beatUnit,
    bpm,
    beats,
    beatType,
    isLast,
    speed
  }: PropsType) {
    this.id = id
    this.isLast = isLast
    this.startTime = startTime

    this.speed = speed || 1

    this.capo = this.getCapo(xmlData)
    this.harmonies = this.getHarmonies(xmlData)
    this.metronome = { beatUnit, bpm }
    this.timeSignature = { beats, beatType }
    this.number = this.getNumber(xmlData)
    this.notes = this.getNotes(xmlData)
  }

  private getCapo(measureXML: MeasureXML): number {
    return measureXML?.attributes?.['staff-details']?.capo || 0
  }

  private getHarmonies(measureXML: MeasureXML): Harmony[] {
    const { harmony } = measureXML
    if (!harmony) {
      return []
    }

    const harmoniesXML = isArray(harmony) ? harmony : [harmony]

    return harmoniesXML.map(({ frame }) => {
      const { 'first-fret': firstFret = 0, 'frame-note': frameNotes = [] } = frame
      const data: Technical[] = frameNotes.map(({ fret = 0, string = 0 }) => ({ fret, string }))

      return {
        data,
        firstFret,
        name: getChordName(data)
      }
    })
  }

  private getNotes(measureXML: MeasureXML): Note[] {
    if (isEmpty(measureXML?.note)) {
      return []
    }

    const notesXML = isArray(measureXML.note) ? measureXML.note : [measureXML.note]
    const notesList: NoteClass[] = []
    let count = 1

    notesXML.forEach((noteXML) => {
      if (this.isChord(noteXML)) {
        const lastNote = notesList[notesList.length - 1]
        lastNote.view = 'chord'
        const data = lastNote.getData(noteXML)
        if (data) lastNote.appendData(data)
      } else {
        const noteClass = new NoteClass({
          id: `N_${this.number}_${count}`,
          xmlData: noteXML
        })

        const data = noteClass.getData(noteXML)
        if (data) noteClass.appendData(data)

        this.addNoteToList(noteClass, notesList)
        count++
      }
    })

    return notesList
  }

  private addNoteToList(noteClass: NoteClass, notesList: NoteClass[]) {
    const startTime = this.time?.start || this.startTime
    const duration = this.calNoteDuration(noteClass)

    this.time = {
      start: startTime,
      duration,
      end: startTime + duration
    }

    noteClass.appendTime(startTime, duration)
    notesList.push(noteClass)
  }

  private getNumber(measureXML: MeasureXML): string {
    return measureXML._number || ''
  }

  private isChord(noteXML: NoteXML): boolean {
    return has(noteXML, 'chord')
  }

  private calNoteDuration(note: Note): number {
    const { view, type, timeModification, notations, dot } = note

    if (!type) {
      return 0
    }

    const { beatUnit, bpm } = this.metronome
    const { beats, beatType } = this.timeSignature

    const beatTime = Math.floor(60 / bpm / (beatType / beatUnit) * 1000)
    let duration = view === 'rest' && type === 'whole' ? beatTime * beats : (beatType / noteTypeToNumber(type)) * beatTime

    if (!isEmpty(timeModification)) {
      const { slur } = notations
      const { actualNotes, normalNotes } = timeModification
      const radix = slur === 'end' ? (Math.floor(100 / actualNotes) + (100 % actualNotes)) / 100 : Math.floor(100 / actualNotes) / 100

      duration = Math.floor(duration * normalNotes * radix)
    }

    if (dot === 'dot') {
      duration = Math.floor(duration * 1.5)
    } else if (dot === 'doubleDot') {
      duration = Math.floor(duration * 1.75)
    }

    return Math.round(duration / this.speed)
  }
}
