import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify'
import del from 'rollup-plugin-delete'
import path from 'path'
import packageJSON from '../package.json'

const getPath = _path => path.resolve(__dirname, _path)
const extensions = [
  '.js',
  '.ts',
  '.tsx'
]

export default {
  input: getPath('../src/index.ts'),
  external: [
    'lodash'
  ],
  output: [
    {
      name: 'simple-musicxml-guitar',
      file: packageJSON.main, // 通用模块
      format: 'umd',
      globals: {
        lodash: 'lodash'
      }
    },
    {
      name: 'simple-musicxml-guitar',
      file: packageJSON.module, // es6模块
      format: 'esm',
      globals: {
        lodash: 'lodash'
      }
    }
  ],
  plugins:[
    del({ targets: 'dist/*' }),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify('production')
      }
    }),
    json(),
    nodeResolve(extensions),
    commonjs(),
    eslint({
      throwOnError: true,
      include: ['src/**/*.ts'],
      exclude: ['node_modules/**', 'dist/**', 'demos/**', 'build/**']
    }),
    typescript({
      extensions
    }),
    uglify()
  ]
}
