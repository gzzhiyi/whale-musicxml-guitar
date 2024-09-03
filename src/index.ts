import { isArray, isEmpty, isObject } from 'lodash'
import { XMLValidator } from 'fast-xml-parser'
import {
  Measure,
  MeasureXML,
  MusicXML,
  Note,
  NoteType,
  PartXML
} from '@/types'
import parseXML from '@/core/parseXML'
import PartClass from '@/classes/Part'

type OptionType = {
  bpm?: number
  bpmUnit?: NoteType
  debug?: boolean
  speed?: number
}

export class Parser {
  public xmlVersion: string = ''
  public scoreVersion: string = ''
  public scoreType: string = ''

  public duration: number = 0
  public parts: PartClass[] = []
  public title: string = ''

  private _debug: boolean = false
  private _speed: number = 1

  private _oriXml: MusicXML | {} = {}

  constructor(xmlStr: string, option: OptionType = {}) {
    if (!this.validateXML(xmlStr)) return

    // Options
    this._debug = option.debug ?? this._debug
    this._speed = option.speed ?? this._speed

    // Original data
    this._oriXml = parseXML(xmlStr) || {}

    this.parts = this.getParts(this._oriXml).map((part) => {
      const measures = this.getMeasures(part)
      return new PartClass({ measures })
    })

    // Logs
    this._debug && console.log(this)
  }

  private validateXML(xmlStr: string): boolean {
    if (!XMLValidator.validate(xmlStr)) {
      console.error('Not valid file type.')
      return false
    }
    return true
  }

  getMeasureById(id: string): Measure | null {
    return null
  }

  private getMeasures(partXML: PartXML): MeasureXML[] {
    const measure = partXML.measure;
    if (isArray(measure)) return measure
    if (isObject(measure)) return [measure]
    return []
  }

  getNoteById(id: string): Note | null {
    return null
  }

  private getParts(xml: MusicXML): PartXML[] {
    const partXML = xml?.['score-partwise']?.part
    if (isEmpty(partXML)) return []

    const parts: PartXML[] = isArray(partXML) ? partXML : isObject(partXML) ? [partXML] : []
    return this.filterTabParts(parts)
  }

  private filterTabParts(parts: PartXML[]): PartXML[] {
    return parts.filter(part => {
      const measure = part.measure
      const firstMeasure = isArray(measure) ? measure[0] : isObject(measure) ? measure : null
      return firstMeasure?.attributes?.clef?.sign === 'TAB'
    })
  }
}
