import React, { useEffect } from 'react'
import axios from 'axios'
import { SMGuitar } from '../dist/index.esm.js'

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
    const xmlDoc = await getXMLData('/xml/test/note.xml')
    const SMG = new SMGuitar(xmlDoc, {
      debug: true,
      speed: 1,
      minWidth: 10
    })

    // const data = [
    //   { string: 5, fret: 3 },
    //   { string: 2, fret: 1 },
    //   { string: 3, fret: 0 },
    //   { string: 4, fret: 2 },
    //   { string: 1, fret: 0 }
    // ];
    // console.log(SMG.getChordName(data))
    // console.log(SMG.getMeasureById('M_2'))
    // console.log(SMG.getNoteById('N_10'))
    // console.log(SMG.numberToType(8))
    // console.log(SMG.typeToNumber('16th'))
  }, [])

  return (
    <div>
      <h1>Demo</h1>
    </div>
  )
}
