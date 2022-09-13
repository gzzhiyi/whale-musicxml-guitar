declare type OptionProps = {
    debug: boolean;
};
export declare class MxmlQuery {
    _debug: any;
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
declare const _default: {};
export default _default;
