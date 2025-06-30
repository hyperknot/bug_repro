import path from 'node:path'
// @ts-ignore
import stylexPostcss from '@stylexjs/postcss-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const stylexBabelConfig = {
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
  },
  plugins: [
    react({
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
