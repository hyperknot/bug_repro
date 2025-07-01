import path from 'node:path'
import { defineConfig } from 'vite'

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
  plugins: [],
})
