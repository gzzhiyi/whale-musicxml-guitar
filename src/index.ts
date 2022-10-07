import {
  XMLValidator,
  XMLParser
} from 'fast-xml-parser'
import findChordName from './methods/findChordName'
import findAllParts from './methods/findAllParts'
import findAllMeasures from './methods/findAllMeasures'
import findAllHarmonies from './methods/findAllHarmonies'
import findAllNotes from './methods/findAllNotes'
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

function xmlToJson(mXML: string, preserveOrder = false) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    preserveOrder
  })
  return parser.parse(mXML)
}

type OptionProps = {
  debug: boolean
  bpm: number
  speed?: number
}

export class MxmlQuery {
  public _debug: any
  public _bpm: any
  public _speed: any

  public _oriXml: any
  public _oriParts: any
  public _oriMeasures: any
  public _oriHarmonies: any
  public _oriNotes: any

  public xmlVersion: string = ''
  public scoreVersion: string = ''
  public scoreType: string = ''
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
    this._debug = option?.debug
    this._bpm = option?.bpm
    this._speed = option?.speed

    // Origin
    this._oriXml = xmlToJson(xml) || {}
    this._oriParts = findAllParts(this._oriXml)
    this._oriMeasures = findAllMeasures(this._oriParts)
    this._oriHarmonies = findAllHarmonies(this._oriMeasures)
    this._oriNotes = findAllNotes(this._oriMeasures)

    // Attributes
    this.xmlVersion = this._oriXml['?xml']?._version
    this.scoreVersion = this._oriXml['score-partwise']?._version || this._oriXml['score-timewise']?._version
    this.scoreType = getScoreType(this._oriXml)
    this.clef = getClef(this._oriMeasures)
    this.tuningStep = getTuningStep(this._oriMeasures)
    this.harmonies = getHarmonies(this._oriHarmonies)

    const { measureList, noteList, timeline } = parseData(this._oriMeasures, this.clef, this._bpm, this._speed)
    this.measures = measureList
    this.notes = noteList
    this.timeline = timeline

    findChordName(this.notes, this.harmonies)

    // Logs
    this._debug && console.log(this)
  }

  getScoreDuration() {
    return getScoreDuration(this.timeline)
  }

  getMeasureDuration(measureId) {
    return getMeasureDuration(measureId, this.notes, this.timeline)
  }

  getNoteDuration(nodeId) {
    return getNoteDuration(nodeId, this.timeline)
  }
}

export const noteTypeToNumber = noteTypeToNumberFn
export const numberToNoteType = numberToNoteTypeFn
