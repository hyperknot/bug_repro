import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

const isUnminified = process.env.UNMINIFIED === '1'

export default defineConfig({
  build: {
    cssMinify: !isUnminified,
    minify: !isUnminified,
  },
  resolve: {
    alias: {
      '@shared': path.resolve('../packages/shared'),
    },
  },
  plugins: [
    tailwindcss(),
    solid(),
  ],
  server: {
    port: 3010,
    fs: {
      allow: ['..'],
    },
  },
})
