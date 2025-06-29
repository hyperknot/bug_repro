import path from 'node:path'
// @ts-ignore
import stylex from '@stylexjs/postcss-plugin'
import { defineConfig } from 'vite'
import solid from './vite-plugin-solid-mod'

const stylexBabelConfig = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV === 'development',
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
  },
  plugins: [
    solid({
      preBabel: stylexBabelConfig,
    }),
  ],
  css: {
    postcss: {
      plugins: [
        stylex({
          babelConfig: stylexBabelConfig,
          include: [
            //
            path.resolve('src/**/*.{ts,tsx}'),
            path.resolve('./*.{ts,tsx}'),

            path.resolve('../outside/**/*.{ts,tsx}'),
            path.resolve('../alias/**/*.{ts,tsx}'),
            path.resolve('node_modules/@repo/workspace/**/*.{ts,tsx}'),
          ],
          useCSSLayers: true,
        }),
      ],
    },
  },
})
