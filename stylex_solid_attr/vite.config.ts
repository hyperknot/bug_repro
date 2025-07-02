import type { TransformOptions } from '@babel/core'
// @ts-ignore
import stylexPostcss from '@stylexjs/postcss-plugin'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { classNameToClassPlugin } from './vite_plugins/classNameToClassPlugin'
import { fixStylexPropsPlugin } from './vite_plugins/fixStylexPropsPlugin'
import { stylexPlugin } from './vite_plugins/stylexPlugin'

// shared StyleX Babel configuration
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
      },
    ],
  ],
}

export default defineConfig({
  build: {
    cssMinify: false,
    minify: false,
  },
  plugins: [
    //
    stylexPlugin(stylexBabelConfig),
    classNameToClassPlugin(),
    fixStylexPropsPlugin(),
    solid(),
  ],
  css: {
    postcss: {
      plugins: [
        stylexPostcss({
          babelConfig: stylexBabelConfig,
          include: ['src/**/*.{ts,tsx}', './*.{ts,tsx}'],
          useCSSLayers: true,
        }),
      ],
    },
  },
})
