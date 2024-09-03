# Simple MusicXML Guitar

解析吉他乐谱 MusicXML 为 JSON 格式。请参考[W3C MusicXML](https://www.w3.org/2021/06/musicxml40/)。

## Install

### npm install

  ```bash
    npm i simple-musicxml-guitar
  ```

### yarn install

  ```bash
    yarn add simple-musicxml-guitar
  ```

## Start

```js
  import { Parser } from 'simple-musicxml-guitar'

  async function loadXMLDoc() {
    // Load XML document...
  }

  const xmlDoc = await loadXMLDoc('/xml/example.xml')
  const Parser = new Parser(xmlDoc, { debug: true })

  // return a Query object -
  // { harmonies: [], measures: [], notes: [], timeline: [], ... }
```
