import { MeasureXML, Measure, Note, NoteType } from '../types';
interface ReturnData {
    measureList: Measure[];
    noteList: Note[];
    totalWidth: number;
    totalDuration: number;
}
export default function parseData(measureXML: MeasureXML[] | undefined, speed: number, bpmUnit: NoteType, minWidth: number): ReturnData;
export {};
