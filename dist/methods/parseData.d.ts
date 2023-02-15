import { Measure, Note, NoteTypeString, Time } from '../types';
interface QueryData {
    measureList: Measure[];
    noteList: Note[];
    timeline: Time[];
}
export default function parseData(measureXML: any, clef: any, bpm: number | undefined, bpmUnit: NoteTypeString, speed?: number): QueryData;
export {};
