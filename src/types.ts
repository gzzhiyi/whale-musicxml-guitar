export type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32nd' | '64th'

export type NoteView = 'single' | 'chord' | 'rest'

export type DotValue = 'dot' | 'doubleDot' | null

export type BeamValue = 'begin' | 'continue' | 'end'

export type SlurValue = 'start' | 'continue' | 'end' | null

export type StemValue = 'up' | 'down' | null

export type TiedValue = 'start' | 'continue' | 'stop'

export type TupletValue = 'start' | 'continue' | 'stop'

export type MusicXML = {
  'score-partwise'?: PartwiseXML
}

type PartwiseXML = {
  part?: PartXML[]
}

export type PartXML = {
  measure?: MeasureXML | MeasureXML[]
}

export type MeasureXML = {
  [propName: string]: any
  attributes?: MeasureAttributes
  note?: any
}

type MeasureAttributes = {
  clef?: Clef
  time?: TimeSignatureXML
}

type Clef = {
  sign: string
  _number: string
}

export type TimeSignatureXML = {
  beats?: number
  'beat-type': number
}

export type NoteXML = {
  [propName: string]: any
}

export type HarmonyXML = {
  frame: {
    'first-fret': number
    'frame-note': Technical[]
  }
}

export type Harmony = {
  data: Technical[]
  firstFret: number
  name: string
}

export interface NoteData extends Technical {
  pitch: Pitch
}

type Pitch = {
  alter: number | null
  octave: number | null
  step: string | null
}

export type Technical = {
  fret: number
  string: number
}

export interface Time {
  start: number
  duration: number
  end: number
}

export type TimeModification = {
  actualNotes: number
  normalNotes: number
}

export type TimeSignature = {
  beats: number
  beatType: number
}

export type Part = {
  duration: number
  measures: Measure[]
}

export type Measure = {
  capo: number
  harmonies: Harmony[]
  id: string
  isLast: boolean
  metronome: Metronome
  notes: Note[]
  number: string
  time: Time
  timeSignature: TimeSignature
}

export type Notations = {
  slur: SlurValue
  tied: TiedValue[] | null
  tuplet: TupletValue[] | null
}

export type Note = {
  beam: BeamValue[] | null
  data: NoteData[] | null
  dot: DotValue
  id: string
  notations: Notations
  stem: StemValue
  time: Time | null
  timeModification: TimeModification | null
  type: NoteType
  view: NoteView
}

export type Metronome = {
  beatUnit: number
  bpm: number
}
