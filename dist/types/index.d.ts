export declare type NoteTypeString = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32th' | '64th' | '128th' | '256th' | '512th' | '1024th';
export declare type NoteTypeNumber = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024;
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
    beats: NoteTypeNumber;
    beatType: NoteTypeNumber;
    capo: number;
    harmony?: any;
}
export interface Note {
    id: string;
    name?: string;
    measureId: string;
    type: NoteTypeString;
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
