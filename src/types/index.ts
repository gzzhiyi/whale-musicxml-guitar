// 音符类型
type NoteTypeValueString = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32th' | '64th' | '128th' | '256th' | '512th' | '1024th'

type NoteTypeValueNumber = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024

export type NoteTypeValue = NoteTypeValueString | NoteTypeValueNumber

// 曲谱类型
export type ScoreType = 'partwise' | 'timewise' | ''

export type Measure = {
  id: string
  partId: string
  bpm: number
  beats: NoteTypeValue
  beatType: NoteTypeValue
  capo: number
}

export type NoteView = 'single' | 'chord' | 'rest' | 'blank'

export type DotType = 'dot' | 'doubleDot' | ''

export type SlurType = 'start' | 'end' | 'continue'

export type SlurNote = {
  type: SlurType
  actualNotes: number
  normalNotes: number
}

export type Note = {
  id: string
  measureId: string
  type: NoteTypeValue
  view: NoteView
  data: any
  dot?: DotType
  slur?: SlurNote
}
