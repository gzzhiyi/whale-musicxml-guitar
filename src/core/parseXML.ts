import { XMLParser } from 'fast-xml-parser'
import { MusicXML } from '@/types'

function removeGPTags(str) {
  const xmlTagPattern = /<\?xml[^?]*\?>/g
  while (xmlTagPattern.test(str)) {
    str = str.replace(xmlTagPattern, '')
  }

  str = str.replace(/<\?GP|\?>/g, '')

  return str
}

export default function parseXML(musicXML: string): MusicXML {
  const cleanedStr = removeGPTags(musicXML)

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '_',
    preserveOrder: false
  })

  return parser.parse(cleanedStr)
}
