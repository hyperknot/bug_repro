import path from 'node:path'
import type { TransformOptions } from '@babel/core'
import * as babel from '@babel/core'
// @ts-expect-error
import stylexPostcss from '@stylexjs/postcss-plugin'
import { createFilter, defineConfig, type Plugin } from 'vite'
import solid from 'vite-plugin-solid'

// Shared StyleX Babel configuration
const stylexBabelConfig: TransformOptions = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV === 'development',
        test: process.env.NODE_ENV === 'test',
        runtimeInjection: false,
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: 'commonJS',
        },
        aliases: {
          '@alias/*': path.resolve('../alias/*'),
        },
      },
    ],
  ],
}

function stylexPlugin(): Plugin {
  const filter = createFilter('**/*.{js,ts,jsx,tsx}', 'node_modules/**')

  return {
    name: 'stylex-js-transform',
    enforce: 'pre',
    async transform(code: string, id: string) {
      if (!filter(id)) return null

      // skip files without StyleX usage
      if (!code.includes('stylex')) {
        return null
      }

      const result = await babel.transformAsync(code, {
        ...stylexBabelConfig,
        filename: id,
        sourceMaps: true,
      })

      return result?.code ? { code: result.code, map: result.map } : null
    },
  }
}

export default defineConfig({
  build: {
    cssMinify: false,
    minify: false,
  },
  resolve: {
    alias: {
      '@alias': path.resolve('../alias'),
    },
    dedupe: ['solid-js', '@stylexjs/stylex'],
  },
  plugins: [
    //
    stylexPlugin(),
    solid(),
  ],
  css: {
    postcss: {
      plugins: [
        stylexPostcss({
          babelConfig: stylexBabelConfig,
          include: [
            'src/**/*.{ts,tsx}',
            './*.{ts,tsx}',
            '../outside/**/*.{ts,tsx}',
            '../alias/**/*.{ts,tsx}',
            'node_modules/@repo/workspace/**/*.{ts,tsx}',
          ],
          useCSSLayers: true,
        }),
      ],
    },
  },
})
