# Whale MusicXML Guitar
这是一个专为吉他设计的 npm 工具包，用于将吉他相关的 MusicXML 数据转换为 JSON 格式。工具包能够解析 TAB 乐谱中的音符、和弦等信息，并将其转换为结构化的 JSON 格式，方便在应用程序中进行处理或可视化展示。

## 功能特点
- 专门解析吉他乐谱中的音符和和弦数据。
- 高效的 MusicXML 到 JSON 数据转换。
- 适合集成到音乐应用或吉他相关项目中。
- 轻量级、易于使用。

## 安装

通过NPM安装
```bash
  npm i whale-musicxml-guitar
```

通过Yarn安装
```bash
  yarn add whale-musicxml-guitar
```

## 使用
```js
  import { Parser } from 'whale-musicxml-guitar'

  async function loadXMLDoc() {
    // Load XML document...
  }

  const xmlDoc = await loadXMLDoc('/xml/example.xml')
  const Parser = new Parser(xmlDoc, { debug: true })

  // return a Query object -
  // { harmonies: [], measures: [], notes: [], timeline: [], ... }
```

## API文档


## Demo
