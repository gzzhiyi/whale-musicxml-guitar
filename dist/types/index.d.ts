export declare type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32th' | '64th' | '128th' | '256th' | '512th' | '1024th';
export declare type NoteView = 'single' | 'chord' | 'rest' | 'blank';
export declare type ScoreType = 'partwise' | 'timewise' | '';
export declare type DotType = 'dot' | 'doubleDot' | '';
export declare type SlurType = 'start' | 'continue' | 'end';
export interface Clef {
    line: number;
    sign: string;
    number?: string;
}
export interface SlurNote {
    type: SlurType;
    actualNotes: number;
    normalNotes: number;
}
export interface Measure {
    id: string;
    partId: string;
    bpm: number;
    beats: number;
    beatType: number;
    capo: number;
    harmony?: any;
    _number?: string;
}
export interface Note {
    id: string;
    name?: string;
    measureId: string;
    type: NoteType;
    view: NoteView;
    data: any;
    dot?: DotType;
    slur?: SlurNote;
}
export interface Time {
    noteId: string;
    measureId: string;
    duration: number;
    startTime: number;
    endTime: number;
}
export interface Harmony {
    firstFret: number;
    name: string;
    data: {
        string: number;
        fret: number;
        step: string;
        octave: string;
    };
}
