import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

const plugins = [resolve(), commonjs({ extensions: ['.js', '.ts'] }), production && terser()]
const compilerOptions = {
  target: 'es6',
  module: 'ESNext',
  esModuleInterop: true,
  strict: true,
  skipLibCheck: true
}

const inputContentPage = './src/contentPage.ts'
const outputContentPage = '../angular/dist/contentPage.js'

const inputServiceWorker = './src/serviceWorker.ts'
const outputServiceWorker = '../angular/dist/serviceWorker.js'

export default [
  {
    input: inputContentPage,
    output: {
      file: outputContentPage,
      format: 'iife',
      sourcemap: !production
    },
    plugins: [
      ...plugins,
      typescript({
        compilerOptions: {
          ...compilerOptions,
          lib: ['dom', 'ES2022']
        }
      })
    ]
  },
  {
    input: inputServiceWorker,
    output: {
      file: outputServiceWorker,
      format: 'iife',
      sourcemap: !production
    },
    plugins: [
      ...plugins,
      typescript({
        compilerOptions: {
          ...compilerOptions,
          lib: ['ES2022']
        }
      })
    ]
  }
]
