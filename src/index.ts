import { XMLValidator, XMLParser } from 'fast-xml-parser'
import { NoteTypeString, ScoreType } from './types'
import findChordName from './methods/findChordName'
import findAllParts from './methods/findAllParts'
import findAllMeasures from './methods/findAllMeasures'
import findAllHarmonies from './methods/findAllHarmonies'
import getScoreType from './methods/getScoreType'
import getClef from './methods/getClef'
import getTuningStep from './methods/getTuningStep'
import getHarmonies from './methods/getHarmonies'
import getScoreDuration from './methods/getScoreDuration'
import getMeasureDuration from './methods/getMeasureDuration'
import getNoteDuration from './methods/getNoteDuration'
import parseData from './methods/parseData'
import noteTypeToNumberFn from './methods/noteTypeToNumber'
import numberToNoteTypeFn from './methods/numberToNoteType'

/**
 * Convert MusicXML to JSON
 * @param {string} musicXML - MusicXML strings
 * @returns
 */
function musicXMLToJson(musicXML: string) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    preserveOrder: false
  })
  return parser.parse(musicXML)
}

// Option's props type
interface OptionProps {
  debug?: boolean
  bpm?: number
  bpmUnit?: NoteTypeString
  speed?: number
}

/**
 * Query MusicXML Class.
 * @example
 * const Query = new MxmlQuery()
 */
export class MxmlQuery {
  private _debug: boolean = false
  private _bpm: number = 0
  private _bpmUnit: NoteTypeString = 'quarter'
  private _speed: number = 1

  private _oriXml: any
  private _oriParts: any
  private _oriMeasures: any
  private _oriHarmonies: any

  public xmlVersion: string = ''
  public scoreVersion: string = ''
  public scoreType: ScoreType = ''
  public clef: any
  public tuningStep: any
  public harmonies: any
  public measures: any
  public notes: any
  public timeline: any

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

    // Mxml original data
    this._oriXml = musicXMLToJson(xml) || {}
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

    const { measureList, noteList, timeline } = parseData(this._oriMeasures, this.clef, this._bpm, this._bpmUnit, this._speed)
    this.measures = measureList
    this.notes = noteList
    this.timeline = timeline

    findChordName(this.notes, this.harmonies)

    // Logs
    this._debug && console.log(this)
  }

  getScoreDuration(): number {
    return getScoreDuration(this.timeline)
  }

  getMeasureDuration(measureId: string): number {
    return getMeasureDuration(measureId, this.notes, this.timeline)
  }

  getNoteDuration(nodeId: string): number {
    return getNoteDuration(nodeId, this.timeline)
  }
}

export const noteTypeToNumber = noteTypeToNumberFn
export const numberToNoteType = numberToNoteTypeFn
