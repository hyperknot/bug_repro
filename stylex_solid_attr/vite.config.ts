import type { TransformOptions } from '@babel/core'
import * as babel from '@babel/core'
// @ts-ignore
import stylexPostcss from '@stylexjs/postcss-plugin'
import { createFilter, defineConfig, type Plugin } from 'vite'
import solid from 'vite-plugin-solid'

// Babel plugin to transform className to class
const classNameToClassPlugin = (): babel.PluginObj => ({
  name: 'className-to-class',
  visitor: {
    JSXSpreadAttribute(path) {
      console.log('JSXSpreadAttribute', path)

      // Handle spread attributes like {...{className: "..."}}
      if (path.node.argument.type === 'ObjectExpression') {
        path.node.argument.properties.forEach((prop) => {
          if (
            prop.type === 'ObjectProperty' &&
            prop.key.type === 'Identifier' &&
            prop.key.name === 'className'
          ) {
            console.log(path)
            prop.key.name = 'class'
          }
        })
      }
    },
    JSXAttribute(path) {
      console.log('JSXAttribute', path)

      // Handle direct className attributes
      if (path.node.name.name === 'className') {
        path.node.name.name = 'class'
      }
    },
  },
})

function stylexPlugin(): Plugin {
  const filter = createFilter('**/*.{js,ts,jsx,tsx}', 'node_modules/**')

  return {
    name: 'stylex-js-transform',
    enforce: 'pre',
    async transform(code: string, id: string) {
      if (!filter(id)) return null

      // skip files without StyleX usage
      if (!code.includes('stylex')) {
        return null
      }

      const result = await babel.transformAsync(code, {
        ...stylexBabelConfig,
        filename: id,
        sourceMaps: true,
      })
      // console.log(id)
      // console.log(result?.code)

      return result?.code ? { code: result.code, map: result.map } : null
    },
  }
}

// shared StyleX Babel configuration
const stylexBabelConfig: TransformOptions = {
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
      },
    ],
    classNameToClassPlugin(),
  ],
}

export default defineConfig({
  build: {
    cssMinify: false,
    minify: false,
  },
  plugins: [
    //
    stylexPlugin(),
    solid(),
  ],
  css: {
    postcss: {
      plugins: [
        stylexPostcss({
          babelConfig: stylexBabelConfig,
          include: ['src/**/*.{ts,tsx}', './*.{ts,tsx}'],
          useCSSLayers: true,
        }),
      ],
    },
  },
})
