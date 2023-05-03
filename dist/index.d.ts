import { Harmony, Measure, Note, NoteData, NoteType } from './types';
interface OptionProps {
    bpm?: number;
    bpmUnit?: NoteType;
    debug?: boolean;
    speed?: number;
    minWidth?: number;
}
export declare class SMGuitar {
    xmlVersion: string;
    scoreVersion: string;
    scoreType: string;
    clef: any;
    tuningStep: any;
    harmonies: Harmony[];
    measures: Measure[];
    notes: Note[];
    totalWidth: number;
    totalDuration: number;
    getMeasureById: Function;
    getNoteById: Function;
    getNotesByMeasureId: Function;
    private _speed;
    private _bpmUnit;
    private _debug;
    private _minWidth;
    private _oriXml;
    private _oriParts;
    private _oriMeasures;
    private _oriHarmonies;
    constructor(xml: string, option?: OptionProps);
}
export declare function getChordName(data: NoteData): string;
export declare function numberToType(num: number): NoteType;
export declare function typeToNumber(type: NoteType): number;
export {};
