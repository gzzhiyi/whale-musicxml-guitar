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
    data: NoteData;
}
export interface NoteData {
    string: number;
    fret: number;
}
export interface Time {
    start: number;
    duration: number;
    end: number;
}
export interface Slur {
    type: SlurType;
    actualNotes: number;
    normalNotes: number;
}
export interface Tie {
    type: TieType;
}
export interface Coord {
    x: number;
}
export interface Size {
    width: number;
}
export interface Measure {
    id: string;
    partId: string;
    bpm: number;
    beats: number;
    beatType: number;
    capo: number;
    coord?: Coord;
    time?: Time;
    size?: Size;
    isLast?: boolean;
}
export interface Note {
    id: string;
    measureId: string;
    type?: NoteType;
    name?: string;
    view?: NoteView;
    data?: NoteData | NoteData[];
    dot?: DotType;
    slur?: Slur;
    tie?: Tie;
    time?: Time;
    coord?: Coord;
    size?: Size;
    beam?: BeamType;
}
