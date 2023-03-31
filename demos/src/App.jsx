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
    const xmlDoc = await getXMLData('/xml/test/chord.xml')
    new SMGuitar(xmlDoc, { debug: true })
  }, [])

  return (
    <div>
      <h1>Demo</h1>
    </div>
  )
}
