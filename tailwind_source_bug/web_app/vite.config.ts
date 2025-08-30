// @ts-expect-error
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  build: {
    cssMinify: false,
  },
  resolve: {
    alias: {
      '@shared': path.resolve('../packages/shared'),
    },
  },
  plugins: [tailwindcss(), solid()],
  server: {
    port: 3010,
    fs: {
      allow: ['..'],
    },
  },
})
