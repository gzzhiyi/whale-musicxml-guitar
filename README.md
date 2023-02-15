# Simple MusicXML Guitar

解析吉他乐谱 MusicXML 为 JSON 格式。请参考[W3c MusicXML](https://www.w3.org/2021/06/musicxml40/)。

## 安装

### npm安装

  ```bash
    npm i simple-xmlmusic-guitar
  ```

### yarn安装

  ```bash
    yarn add simple-xmlmusic-guitar
  ```

## 开始

```js
  import { MxmlQuery } from 'simple-xmlmusic-guitar'

  async function loadXMLDoc() {
    // Load XML document...
  }

  const xmlDoc = await loadXMLDoc('/xml/example.xml')
  const Query = new MxmlQuery(xmlDoc, { debug: true })

  // return a Query object -
  // { harmonies: [], measures: [], notes: [], timeline: [], ... }
```
