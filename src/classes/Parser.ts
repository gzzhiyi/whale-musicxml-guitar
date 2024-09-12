import {
  find,
  isArray,
  isEmpty,
  isObject
} from 'lodash'
import { XMLValidator } from 'fast-xml-parser'
import parseXML from '@/core/parseXML'
import PartClass from '@/classes/Part'
import {
  MusicXML,
  PartXML,
  MeasureXML,
  Measure,
  Note
} from '@/types'

type PropsType = {
  debug?: boolean
  speed?: number
  xmlStr: string
}

export default class Parser {
  public parts: PartClass[] = []
  public title: string = ''

  private _debug: boolean = false
  private _oriXml: MusicXML | {} = {}
  private _speed: number = 1

  constructor(props: PropsType) {
    const { debug, speed, xmlStr } = props

    if (!XMLValidator.validate(xmlStr)) {
      console.error('Not valid file type.')
      return
    }

    // Original data
    this._debug = debug ?? this._debug
    this._oriXml = parseXML(xmlStr) || {}
    this._speed = speed ?? this._speed

    this.parts = this.getParts(this._oriXml).map((part) => {
      const measures = this.getMeasures(part)
      return new PartClass({ measures, speed })
    })

    this.title = this.getTitle(this._oriXml)

    // Logs
    this._debug && console.log(this)
  }

  private getTitle(musicXml: MusicXML): string {
    return musicXml['score-partwise']?.work?.['work-title'] || ''
  }

  private filterTabParts(parts: PartXML[]): PartXML[] {
    return parts.filter(part => {
      const measure = part.measure
      const firstMeasure = isArray(measure) ? measure[0] : isObject(measure) ? measure : null
      return firstMeasure?.attributes?.clef?.sign === 'TAB'
    })
  }

  private getParts(xml: MusicXML): PartXML[] {
    const partXML = xml?.['score-partwise']?.part
    if (isEmpty(partXML)) return []

    const parts: PartXML[] = isArray(partXML) ? partXML : isObject(partXML) ? [partXML] : []
    return this.filterTabParts(parts)
  }

  getMeasureById(id: string): Measure | null {
    for (const part of this.parts) {
      const measure = find(part.measures, { id })
      if (measure) {
        return measure
      }
    }

    return null
  }

  private getMeasures(partXML: PartXML): MeasureXML[] {
    const measure = partXML.measure;
    if (isArray(measure)) return measure
    if (isObject(measure)) return [measure]
    return []
  }

  getNoteById(id: string): Note | null {
    const allNotes = this.parts.flatMap(part =>
      part.measures.flatMap(measure => measure.notes)
    )

    return find(allNotes, { id }) || null
  }
}
