export declare type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32th' | '64th' | '128th' | '256th' | '512th' | '1024th';
export declare type NoteView = 'single' | 'chord' | 'rest';
export declare type DotType = 'dot' | 'doubleDot' | '';
export declare type BeamType = 'begin' | 'continue' | 'end' | '';
export declare type SlurType = 'start' | 'continue' | 'end';
export declare type TieType = 'start' | 'continue' | 'stop';
export interface MeasureXML {
    _number?: string;
    note?: NoteXML[];
    harmony?: HarmonyXML | HarmonyXML[];
    [propName: string]: any;
}
export interface NoteXML {
    type: NoteType;
    notations?: {
        technical: {
            fret: number;
            string: number;
        };
        tied?: {
            _type: TieType;
        };
    };
    [propName: string]: any;
}
export interface HarmonyXML {
    frame: {
        'first-fret': number;
        'frame-note': {
            string: number;
            fret: number;
        };
    };
    [propName: string]: any;
}
export interface Clef {
    line?: number;
    sign?: string;
    number?: string;
}
export interface Harmony {
    firstFret: number;
    name: string;
    data: {
        string: number;
        fret: number;
    };
}
export interface NoteData {
    string: number;
    fret: number;
}
export interface TimeProps {
    start: number;
    duration: number;
}
export interface SlurProps {
    type: SlurType;
    actualNotes: number;
    normalNotes: number;
}
export interface TieProps {
    type: TieType;
}
export interface CoordsProps {
    x: number;
}
export interface SizeProps {
    width: number;
}
export interface Measure {
    id: string;
    partId: string;
    bpm: number;
    beats: number;
    beatType: number;
    capo: number;
    time?: TimeProps;
    size?: SizeProps;
}
export interface Note {
    id: string;
    measureId: string;
    type?: NoteType;
    name?: string;
    view?: NoteView;
    data?: NoteData | NoteData[];
    dot?: DotType;
    slur?: SlurProps;
    tie?: TieProps;
    time?: TimeProps;
    coord?: CoordsProps;
    size?: SizeProps;
    beam?: BeamType;
}
