import path from 'node:path'
// @ts-ignore
import stylex from '@stylexjs/postcss-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const babelConfig = {
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
          // rootDir: '..',
        },
        // rewriteAliases: true,
        aliases: {
          '@alias/*': path.resolve('../vite_stylex_outside/*'),
        },
      },
    ],
  ],
}

export default defineConfig({
  build: {
    cssMinify: false, // just to see the results
  },
  resolve: {
    alias: {
      '@alias': path.resolve('../vite_stylex_outside'),
    },
  },
  plugins: [
    react({
      babel: babelConfig,
    }),
  ],
  css: {
    postcss: {
      plugins: [
        stylex({
          babelConfig,
          include: [
            //
            path.resolve('src/**/*.{ts,tsx}'),
            path.resolve('./*.{ts,tsx}'),
            path.resolve('../vite_stylex_outside/**/*.{ts,tsx}'),
          ],
          useCSSLayers: true,
        }),
      ],
    },
  },
})
