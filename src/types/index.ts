// 音符类型
export type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32th' | '64th' | '128th' | '256th' | '512th' | '1024th'

// 音符显示类型
export type NoteView = 'single' | 'chord' | 'rest'

// 附点类型
export type DotType = 'dot' | 'doubleDot' | ''

// 时值横杆类型
export type BeamType = 'begin' | 'continue' | 'end' | ''

// 连音类型
export type SlurType = 'start' | 'continue' | 'end'

// 延长音类型
export type TieType = 'start' | 'continue' | 'stop'

// 小节XML
export interface MeasureXML {
  _number?: string
  note?: NoteXML[]
  harmony?: HarmonyXML | HarmonyXML[]
  [propName: string]: any
}

// 音符XML
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

// 和弦图XML
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

// 和弦图
export interface Harmony {
  firstFret: number
  name: string
  data: NoteData
}

// 音符数据
export interface NoteData {
  string: number
  fret: number
}

// 时间属性
export interface Time {
  start: number // 开始时间（毫秒）
  startRange?: number // 开始时间范围（毫秒）
  duration: number // 持续时间（毫秒）
  end: number // 结束时间（毫秒）
  endRang?: number // 结束时间范围（毫秒）
}

// 连音属性
export interface Slur {
  type: SlurType
  actualNotes: number
  normalNotes: number
}

// 延长音属性
export interface Tie {
  type: TieType
}

// 坐标属性
export interface Coord {
  x: number
}

// 尺寸属性
export interface Size {
  width: number
}

// 小节
export interface Measure {
  id: string
  partId: string
  bpm: number
  beats: number
  beatType: number
  capo: number
  coord?: Coord
  time?: Time
  size?: Size
  isLast?: boolean
}

// 音符
export interface Note {
  id: string
  measureId: string
  type?: NoteType
  name?: string // 音符名称（和弦）
  view?: NoteView // 音符显示类型
  data?: NoteData | NoteData[]
  dot?: DotType
  slur?: Slur
  tie?: Tie
  time?: Time
  coord?: Coord
  size?: Size
  beam?: BeamType
}
