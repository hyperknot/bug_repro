import { defineConfig, presetMini } from 'unocss'

export default defineConfig({
  presets: [presetMini()],
  theme: {
    colors: {
      proj: 'orange',
      src: 'green',
      outside: 'purple',
      alias: 'blue',
      workspace: 'magenta',
    },
  },
})
