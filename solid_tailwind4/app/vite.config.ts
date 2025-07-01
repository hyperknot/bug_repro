import path from 'node:path'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

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
    tailwindcss(),
    solid(),
  ],
})
