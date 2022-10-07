import noteTypeToNumberFn from './methods/noteTypeToNumber';
import numberToNoteTypeFn from './methods/numberToNoteType';
declare type OptionProps = {
    debug: boolean;
    bpm: number;
    speed?: number;
};
export declare class MxmlQuery {
    _debug: any;
    _bpm: any;
    _speed: any;
    _oriXml: any;
    _oriParts: any;
    _oriMeasures: any;
    _oriHarmonies: any;
    _oriNotes: any;
    xmlVersion: string;
    scoreVersion: string;
    scoreType: string;
    clef: any;
    tuningStep: any;
    harmonies: any;
    measures: any;
    notes: any;
    timeline: any;
    constructor(xml: string, option?: OptionProps);
    getScoreDuration(): any;
    getMeasureDuration(measureId: any): number;
    getNoteDuration(nodeId: any): any;
}
export declare const noteTypeToNumber: typeof noteTypeToNumberFn;
export declare const numberToNoteType: typeof numberToNoteTypeFn;
export {};
