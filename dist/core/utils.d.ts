import { DotType, BeamType } from '../types';
export declare function isTabNote(noteXML: any): boolean;
export declare function isRest(noteXML: any): boolean;
export declare function isChord(noteXML: any): boolean;
export declare function hasTie(noteXML: any): boolean;
export declare function hasSlur(noteXML: any): boolean;
export declare function getDot(noteXML: any): DotType;
export declare function getBeam(noteXML: any): BeamType;
