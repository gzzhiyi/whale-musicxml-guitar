export default function getHarmonies(harmonyXML: any): {
    toString: () => string;
    charAt: (pos: number) => string;
    charCodeAt: (index: number) => number;
    concat: (...strings: string[]) => string;
    indexOf: (searchString: string, position?: number | undefined) => number;
    lastIndexOf: (searchString: string, position?: number | undefined) => number;
    localeCompare: {
        (that: string): number;
        (that: string, locales?: string | string[] | undefined, options?: Intl.CollatorOptions | undefined): number;
    };
    match: {
        (regexp: string | RegExp): RegExpMatchArray | null;
        (matcher: {
            [Symbol.match](string: string): RegExpMatchArray | null;
        }): RegExpMatchArray | null;
    };
    replace: {
        (searchValue: string | RegExp, replaceValue: string): string;
        (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
        (searchValue: {
            [Symbol.replace](string: string, replaceValue: string): string;
        }, replaceValue: string): string;
        (searchValue: {
            [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
        }, replacer: (substring: string, ...args: any[]) => string): string;
    };
    search: {
        (regexp: string | RegExp): number;
        (searcher: {
            [Symbol.search](string: string): number;
        }): number;
    };
    slice: (start?: number | undefined, end?: number | undefined) => string;
    split: {
        (separator: string | RegExp, limit?: number | undefined): string[];
        (splitter: {
            [Symbol.split](string: string, limit?: number | undefined): string[];
        }, limit?: number | undefined): string[];
    };
    substring: (start: number, end?: number | undefined) => string;
    toLowerCase: () => string;
    toLocaleLowerCase: (locales?: string | string[] | undefined) => string;
    toUpperCase: () => string;
    toLocaleUpperCase: (locales?: string | string[] | undefined) => string;
    trim: () => string;
    readonly length: number;
    substr: (from: number, length?: number | undefined) => string;
    valueOf: () => string;
    codePointAt: (pos: number) => number | undefined;
    includes: (searchString: string, position?: number | undefined) => boolean;
    endsWith: (searchString: string, endPosition?: number | undefined) => boolean;
    normalize: {
        (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
        (form?: string | undefined): string;
    };
    repeat: (count: number) => string;
    startsWith: (searchString: string, position?: number | undefined) => boolean;
    anchor: (name: string) => string;
    big: () => string;
    blink: () => string;
    bold: () => string;
    fixed: () => string;
    fontcolor: (color: string) => string;
    fontsize: {
        (size: number): string;
        (size: string): string;
    };
    italics: () => string;
    link: (url: string) => string;
    small: () => string;
    strike: () => string;
    sub: () => string;
    sup: () => string;
    padStart: (maxLength: number, fillString?: string | undefined) => string;
    padEnd: (maxLength: number, fillString?: string | undefined) => string;
    trimEnd: () => string;
    trimStart: () => string;
    trimLeft: () => string;
    trimRight: () => string;
    matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
    replaceAll: {
        (searchValue: string | RegExp, replaceValue: string): string;
        (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
    };
    at: (index: number) => string | undefined;
    [Symbol.iterator]: () => IterableIterator<string>;
}[];
