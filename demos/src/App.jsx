import React, { useEffect } from 'react'
import axios from 'axios'
import {
  Parser,
  getChordName,
  noteTypeToNumber,
  numberToNoteType
} from '../dist/index.esm.js'

export default function App() {
  async function getXMLData(xmlUrl) {
    try {
      const res = await axios({
        url: xmlUrl,
        method: 'GET',
        timeout: 5000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      return res.data
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(async() => {
    const xmlStr = await getXMLData('/xml/song4_100speed.xml')
    const parser = new Parser({
      xmlStr,
      debug: true
    })

    // const data = [
    //   { string: 3, fret: 2 },
    //   { string: 4, fret: 0 },
    //   { string: 2, fret: 3 },
    //   { string: 1, fret: 2 }
    // ]
    // console.log(getChordName(data))

    // console.log(parser.getMeasureById('M_2'))
    // console.log(parser.getNoteById('N_2_2'))
    // console.log(noteTypeToNumber('16th'))
    // console.log(numberToNoteType(32))
  }, [])

  return (
    <div>
      <h1>Demo</h1>
    </div>
  )
}
