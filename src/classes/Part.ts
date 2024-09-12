import { isEmpty } from 'lodash'
import { noteTypeToNumber } from '@/utils'
import MeasureClass from '@/classes/Measure'
import { MeasureXML, Metronome, TimeSignature } from '@/types'

type PropsType = {
  measures: MeasureXML[]
  speed?: number
}

export default class Part {
  public duration: number = 0
  public measures: MeasureClass[] = []

  private beats = 4
  private beatType = 4
  private beatUnit = 4
  private bpm = 60

  constructor({ measures, speed }: PropsType) {
    measures.forEach((measure, index) => {
      const metronome = this.getMetronome(measure)

      if (metronome) this.setGlobalMetronome(metronome)

      const timeSignature = this.getTimeSignature(measure)
      if (timeSignature) this.setGlobalTimeSignature(timeSignature)

      const measureClass = new MeasureClass({
        id: `M_${index + 1}`,
        beatUnit: this.beatUnit,
        bpm: this.bpm,
        beats: this.beats,
        beatType: this.beatType,
        isLast: index === measures.length - 1,
        speed: speed || 1,
        startTime: this.duration,
        xmlData: measure
      })

      this.duration += measureClass.time?.duration || 0
      this.measures.push(measureClass)
    })
  }

  private getMetronome(measureXML: MeasureXML): Metronome | null {
    const metronomeXML = measureXML?.direction?.['direction-type']?.metronome

    return isEmpty(metronomeXML) ? null : {
      beatUnit: noteTypeToNumber(metronomeXML['beat-unit']) || 4,
      bpm: metronomeXML['per-minute'] || 60
    }
  }

  private getTimeSignature(measureXML: MeasureXML): TimeSignature | null {
    const timeXML = measureXML?.attributes?.time

    return isEmpty(timeXML) ? null : {
      beats: timeXML?.beats || 0,
      beatType: timeXML?.['beat-type'] || 0
    }
  }

  private setGlobalMetronome({ beatUnit, bpm }: Metronome) {
    this.beatUnit = beatUnit
    this.bpm = bpm
  }

  private setGlobalTimeSignature({ beats, beatType }: TimeSignature) {
    this.beats = beats
    this.beatType = beatType
  }
}
