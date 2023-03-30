import { XMLValidator } from 'fast-xml-parser'
import { NoteType, ScoreType } from './types'
import findAllParts from './core/score/findAllParts'
import findAllMeasures from './core/score/findAllMeasures'
import findAllHarmonies from './core/score/findAllHarmonies'
import getScoreType from './core/score/getScoreType'
import getClef from './core/score/getClef'
import getTuningStep from './core/score/getTuningStep'
import getHarmonies from './core/score/getHarmonies'
import noteTypeToNumberFn from './core/note/noteTypeToNumber'
import numberToNoteTypeFn from './core/note/numberToNoteType'
import parseToJson from './core/parseToJson'
import parseData from './core/parseData'

// Option's props type
interface OptionProps {
  debug?: boolean
  bpm?: number
  bpmUnit?: NoteType
  speed?: number
}

/**
 * SMGuitar Class.
 * @example
 * const SMG = new SMGuitar()
 */
export class SMGuitar {
  public xmlVersion: string = '' // XML版本
  public scoreVersion: string = '' // 曲谱版本
  public scoreType: ScoreType = '' // 曲谱类型
  public clef: any // 谱号
  public tuningStep: any // 标准调弦
  public harmonies: any // 和弦图
  public measures: any // 小节
  public notes: any // 音符

  private _bpm: number = 0 // BPM
  private _bpmUnit: NoteType = 'quarter' // BPM单位
  private _speed: number = 1 // 速度
  private _debug: boolean = false // 调试模式

  private _oriXml: any
  private _oriParts: any
  private _oriMeasures: any
  private _oriHarmonies: any

  constructor(xml: string, option?: OptionProps) {
    if (!XMLValidator.validate(xml)) { // 校验是否合格的XML文件类型
      console.error(':: Not valid file type ::')
      return
    }

    // Options
    if (option?.debug) {
      this._debug = option?.debug
    }

    if (option?.bpm) {
      this._bpm = option?.bpm
    }

    if (option?.bpmUnit) {
      this._bpmUnit = option?.bpmUnit
    }

    if (option?.speed) {
      this._speed = option?.speed
    }

    // Original datas
    this._oriXml = parseToJson(xml) || {}
    this._oriParts = findAllParts(this._oriXml)
    this._oriMeasures = findAllMeasures(this._oriParts)
    this._oriHarmonies = findAllHarmonies(this._oriMeasures)

    // Class props
    this.xmlVersion = this._oriXml['?xml']?._version
    this.scoreVersion = this._oriXml['score-partwise']?._version || this._oriXml['score-timewise']?._version
    this.scoreType = getScoreType(this._oriXml)
    this.clef = getClef(this._oriMeasures) || {}
    this.tuningStep = getTuningStep(this._oriMeasures)
    this.harmonies = getHarmonies(this._oriHarmonies)

    const { measureList, noteList } = parseData(this._oriMeasures, this.clef, this._bpm, this._bpmUnit, this._speed)
    this.measures = measureList
    this.notes = noteList

    // Logs
    this._debug && console.log(this)
  }

  getScoreDuration(): any {}

  getMeasureDuration(): any {}

  getNoteDuration(): any {}

  getChordName(): any {}
}

export const noteTypeToNumber = noteTypeToNumberFn
export const numberToNoteType = numberToNoteTypeFn
