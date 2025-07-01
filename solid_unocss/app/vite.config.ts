import path from 'node:path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  build: {
    cssMinify: false,
    minify: false,
  },
  resolve: {
    alias: {
      '@alias': path.resolve('../alias'),
    },
    dedupe: ['solid-js'],
  },
  plugins: [
    //
    UnoCSS(),
    solid(),
  ],
})
