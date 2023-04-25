import { XMLValidator } from 'fast-xml-parser'
import { find } from 'lodash'
import {
  Harmony,
  Measure,
  Note,
  NoteType
} from './types'
import findAllParts from './core/score/findAllParts'
import findAllMeasures from './core/score/findAllMeasures'
import findAllHarmonies from './core/score/findAllHarmonies'
import getScoreType from './core/score/getScoreType'
import getClef from './core/score/getClef'
import getTuningStep from './core/score/getTuningStep'
import getHarmonies from './core/score/getHarmonies'
import parseToJson from './core/parseToJson'
import parseData from './core/parseData'
import getChordName from './core/note/getChordName'
import noteTypeToNumber from './core/note/noteTypeToNumber'
import numberToNoteType from './core/note/numberToNoteType'

interface OptionProps {
  bpm?: number
  bpmUnit?: NoteType
  debug?: boolean
  speed?: number
  minWidth?: number
}

/**
 * SMGuitar Class.
 * @example
 * const SMG = new SMGuitar()
 */
export class SMGuitar {
  public xmlVersion: string = '' // XML版本
  public scoreVersion: string = '' // 曲谱版本
  public scoreType: string = '' // 曲谱类型
  public clef: any // 谱号
  public tuningStep: any // 标准调弦
  public harmonies: Harmony[] = [] // 和弦图
  public measures: Measure[] = [] // 小节
  public notes: Note[] = [] // 音符
  public totalWidth: number = 0
  public totalDuration: number = 0

  public getChordName: Function = () => {}
  public getMeasureById: Function = () => {}
  public getNoteById: Function = () => {}
  public getNoteByMeasureId: Function = () => {}

  private _speed: number = 1 // 速度
  private _bpmUnit: NoteType = 'quarter' // BPM单位
  private _debug: boolean = false // 调试模式
  private _minWidth: number = 10 // 音符最小宽度（最小支持到64分音符）

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
      this._debug = option.debug
    }

    if (option?.speed) {
      this._speed = option.speed
    }

    if (option?.bpmUnit) {
      this._bpmUnit = option.bpmUnit
    }

    if (option?.minWidth) {
      this._minWidth = option.minWidth
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

    const { measureList, noteList, totalWidth, totalDuration } = parseData(this._oriMeasures, this._speed, this._bpmUnit, this._minWidth)
    this.measures = measureList
    this.notes = noteList
    this.totalWidth = totalWidth
    this.totalDuration = totalDuration

    // 实例方法
    this.getChordName = (data: any): string => getChordName(data)
    this.getMeasureById = (id: string): Measure | undefined => find(this.measures, { id })
    this.getNoteById = (id: string): Note | undefined => find(this.notes, { id })
    this.getNoteByMeasureId = (measureId: string): Note | undefined => find(this.notes, { measureId })

    // Logs
    this._debug && console.log(this)
  }

  numberToType(num: number): NoteType {
    return numberToNoteType(num)
  }

  typeToNumber(type: NoteType): number {
    return noteTypeToNumber(type)
  }
}
