import path from 'node:path'
import type { TransformOptions } from '@babel/core'
// @ts-expect-error
import stylexPostcss from '@stylexjs/postcss-plugin'
import { defineConfig } from 'vite'
import solid from './vite-plugin-solid-mod'

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
    solid({
      babel: stylexBabelConfig,
    }),
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
