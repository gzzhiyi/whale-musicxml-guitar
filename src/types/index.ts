// Note's type string type
export type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32th' | '64th' | '128th' | '256th' | '512th' | '1024th'

// Note's view type
export type NoteView = 'single' | 'chord' | 'rest' | 'blank'

// Score's type type
export type ScoreType = 'partwise' | 'timewise' | ''

// Dot's type type
export type DotType = 'dot' | 'doubleDot' | ''

// Slur type type
export type SlurType = 'start' | 'continue' | 'end'

// Measure XML type
export interface MeasureXML {
  id: string
  partId: string
  bpm: number
  beats: number
  beatType: number
  capo: number
  harmony?: any
  _number?: string
  [propName: string]: any
}

// Harmony XML Type
export interface HarmonyXML {
  measureId
  frame: {
    'first-fret': number
    'frame-note': {
      string: number
      fret: number
    }
  }
}

// Clef type
export interface Clef {
  line?: number
  sign?: string
  number?: string
}

// Harmony Type
export interface Harmony {
  firstFret: number
  name: string
  data: {
    string: number
    fret: number
    step: string
    octave: string
  }
}

// Slur note type
export interface SlurNote {
  type: SlurType
  actualNotes: number
  normalNotes: number
}

// Note's Data yype
export interface NoteData {
  string: number
  fret: number
  step: string
  octave: number
}

// Note type
export interface Note {
  id: string
  name?: string
  measureId: string
  type: NoteType
  view: NoteView
  data: any
  dot?: DotType
  slur?: SlurNote
}

// Time type
export interface Time {
  noteId: string
  measureId: string
  duration: number
  startTime: number
  endTime: number
}
