import { XMLParser } from 'fast-xml-parser'

/**
 * Parse MusicXML to JSON
 * @param {string} musicXML - MusicXML strings
 * @returns
 */
export default function parseToJson(musicXML: string): any {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '_',
    preserveOrder: false
  })

  return parser.parse(musicXML)
}
