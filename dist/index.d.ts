import { NoteTypeString, ScoreType } from './types';
import noteTypeToNumberFn from './methods/noteTypeToNumber';
import numberToNoteTypeFn from './methods/numberToNoteType';
interface OptionProps {
    debug?: boolean;
    bpm?: number;
    bpmUnit?: NoteTypeString;
    speed?: number;
}
export declare class MxmlQuery {
    private _debug;
    private _bpm;
    private _bpmUnit;
    private _speed;
    private _oriXml;
    private _oriParts;
    private _oriMeasures;
    private _oriHarmonies;
    xmlVersion: string;
    scoreVersion: string;
    scoreType: ScoreType;
    clef: any;
    tuningStep: any;
    harmonies: any;
    measures: any;
    notes: any;
    timeline: any;
    constructor(xml: string, option?: OptionProps);
    getScoreDuration(): number;
    getMeasureDuration(measureId: string): number;
    getNoteDuration(nodeId: string): number;
}
export declare const noteTypeToNumber: typeof noteTypeToNumberFn;
export declare const numberToNoteType: typeof numberToNoteTypeFn;
export {};
