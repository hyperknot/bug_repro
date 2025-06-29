import path from 'node:path'
import * as babel from '@babel/core'
// @ts-ignore
import stylexPostcss from '@stylexjs/postcss-plugin'
import { createFilter, defineConfig } from 'vite'
// You might need to adjust the import path if you modified the plugin file
import solid from 'vite-plugin-solid'

// 1. Define the Babel config for StyleX's transform pass.
// This pass will handle BOTH TypeScript and StyleX.
const stylexBabelConfig = {
  presets: ['@babel/preset-typescript'], // We need this to strip TS before StyleX runs
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV === 'development',
        test: process.env.NODE_ENV === 'test',
        runtimeInjection: false, // This is correct for Vite
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: 'commonJS',
        },
        aliases: {
          '@alias/*': path.resolve('../alias/*'),
        },
        // We do NOT need genCSS here because the PostCSS plugin handles it.
      },
    ],
  ],
}

// 2. Create the dedicated Vite plugin for the StyleX JS/TS transform.
function stylexPlugin() {
  // We only want to transform our own source code, not node_modules.
  // Adjust this filter to match your project structure.
  const filter = createFilter(/\.(js|ts|jsx|tsx)$/, /node_modules/)

  return {
    name: 'stylex-js-transform',
    enforce: 'pre', // This MUST run before the Solid plugin.
    async transform(code: any, id: any) {
      if (!filter(id)) {
        return null
      }

      // Run the Babel transform with our dedicated StyleX config
      const result = await babel.transformAsync(code, {
        ...stylexBabelConfig,
        filename: id,
        sourceMaps: true,
        babelrc: false,
        configFile: false,
      })

      // Return the transformed code and sourcemap to Vite
      if (!result || !result.code) {
        return null
      }

      return {
        code: result.code,
        map: result.map,
      }
    },
  }
}

// 3. Configure Vite
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
    // The StyleX JS/TS transform runs first, in isolation.
    stylexPlugin() as any,

    // The Solid plugin now receives code that has already
    // been processed by StyleX. It will see `className="..."`
    // instead of `stylex.props(...)`, so there's no conflict.
    solid({
      // NO babel config here!
    }),
  ],
  css: {
    // This part of your config is correct and should remain.
    // It's responsible for generating the final CSS file.
    postcss: {
      plugins: [
        stylexPostcss({
          // Note: This babelConfig is only used by the PostCSS plugin
          // to find styles. It doesn't perform the JS transform.
          babelConfig: {
            presets: stylexBabelConfig.presets,
            plugins: stylexBabelConfig.plugins,
          },
          include: [
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
