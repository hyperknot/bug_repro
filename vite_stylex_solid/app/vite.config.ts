import path from 'node:path'
import type { TransformOptions } from '@babel/core'
import * as babel from '@babel/core'
// @ts-ignore
import stylexPostcss from '@stylexjs/postcss-plugin'
import { createFilter, defineConfig, type Plugin } from 'vite'
import solid from 'vite-plugin-solid'

// Shared StyleX Babel configuration
const STYLEX_BABEL_CONFIG: TransformOptions = {
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
    name: 'stylex-transform',
    enforce: 'pre',
    async transform(code: string, id: string) {
      if (!filter(id)) return null

      try {
        const result = await babel.transformAsync(code, {
          ...STYLEX_BABEL_CONFIG,
          filename: id,
          sourceMaps: true,
          babelrc: false,
          configFile: false,
        })

        return result?.code ? { code: result.code, map: result.map } : null
      } catch (error) {
        this.error(`StyleX transform failed for ${id}: ${error}`)
      }
    },
  }
}

export default defineConfig({
  resolve: {
    alias: {
      '@alias': path.resolve('../alias'),
    },
  },
  plugins: [stylexPlugin(), solid()],
  css: {
    postcss: {
      plugins: [
        stylexPostcss({
          babelConfig: STYLEX_BABEL_CONFIG,
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
  // Only include build config if you actually need these settings
  ...(process.env.NODE_ENV === 'development' && {
    build: {
      cssMinify: false,
      minify: false,
    },
  }),
})
