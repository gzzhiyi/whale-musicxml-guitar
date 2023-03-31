// Note's type string type
export type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32th' | '64th' | '128th' | '256th' | '512th' | '1024th'

// Note's view type
export type NoteView = 'single' | 'chord' | 'rest' | 'blank'

// Dot's type type
export type DotType = 'dot' | 'doubleDot' | ''

// Slur type type
export type SlurType = 'start' | 'continue' | 'end'

// Tie type type
export type TieType = 'start' | 'continue' | 'stop'

// Measure XML type
export interface MeasureXML {
  _number?: string
  note?: NoteXML[]
  harmony?: HarmonyXML | HarmonyXML[]
  [propName: string]: any
}

// Note XML type
export interface NoteXML {
  type: NoteType
  notations?: {
    technical: {
      fret: number
      string: number
    }
    tied?: {
      _type: TieType
    }
  }
  [propName: string]: any
}

// Harmony XML type
export interface HarmonyXML {
  frame: {
    'first-fret': number
    'frame-note': {
      string: number
      fret: number
    }
  }
  [propName: string]: any
}

// Clef type
export interface Clef {
  line?: number
  sign?: string
  number?: string
}

// Harmony type
export interface Harmony {
  firstFret: number
  name: string
  data: {
    string: number
    fret: number
  }
}

// Time props type
export interface TimeProps {
  start: number // 开始时间（毫秒）
  duration: number // 持续时间（毫秒）
}

// Note's Data type
export interface NoteData {
  string: number
  fret: number
}

// 连音属性类型
export interface SlurProps {
  type: SlurType
  actualNotes: number
  normalNotes: number
}

// 延长音属性类型
export interface TieProps {
  tie: {
    type: TieType
  }
}

// Measure type
export interface Measure {
  id: string
  partId: string
  bpm: number
  beats: number
  beatType: number
  capo: number
  time?: TimeProps
}

// Note type
export interface Note {
  id: string
  name?: string
  measureId: string
  type: NoteType
  view: NoteView
  data?: NoteData | NoteData[]
  dot?: DotType
  slur?: SlurProps
  time?: TimeProps
}
