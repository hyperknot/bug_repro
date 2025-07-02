import type { TransformOptions } from '@babel/core'
import * as babel from '@babel/core'
// @ts-ignore
import stylexPostcss from '@stylexjs/postcss-plugin'
import { createFilter, defineConfig, type Plugin } from 'vite'
import solid from 'vite-plugin-solid'

// className to class for JSX spread attributes
const classNameToClassBabelPlugin = (): babel.PluginObj => ({
  name: 'className-to-class',
  visitor: {
    JSXSpreadAttribute(path) {
      if (path.node.argument.type === 'ObjectExpression') {
        path.node.argument.properties.forEach((prop) => {
          if (
            prop.type === 'ObjectProperty' &&
            prop.key.type === 'Identifier' &&
            prop.key.name === 'className'
          ) {
            prop.key.name = 'class'
          }
        })
      }
    },
  },
})

function classNameToClassPlugin(): Plugin {
  const filter = createFilter('**/*.{js,ts,jsx,tsx}', 'node_modules/**')

  return {
    name: 'className-to-class',
    enforce: 'pre',
    async transform(code: string, id: string) {
      if (!filter(id)) return null

      // Only run on files containing className
      if (!code.includes('className')) {
        return null
      }

      const result = await babel.transformAsync(code, {
        presets: ['@babel/preset-typescript'],
        plugins: [classNameToClassBabelPlugin()],
        filename: id,
        sourceMaps: true,
      })

      return result?.code ? { code: result.code, map: result.map } : null
    },
  }
}

// Fix props function in node_modules/stylex
const stylexPropsBabelPlugin = (): babel.PluginObj => ({
  name: 'stylex-props-fix',
  visitor: {
    FunctionDeclaration(path) {
      if (path.node.id && path.node.id.name === 'props') {
        // Traverse the function body to find className assignments
        path.traverse({
          MemberExpression(memberPath) {
            if (
              memberPath.node.property.type === 'Identifier' &&
              memberPath.node.property.name === 'className' &&
              !memberPath.node.computed
            ) {
              memberPath.node.property.name = 'class'
            }
          },
        })
      }
    },
  },
})

function fixStylexPropsClassNamePlugin(): Plugin {
  // Target the specific stylex.mjs file
  const filter = createFilter('**/@stylexjs/stylex/**/stylex.mjs')

  return {
    name: 'stylex-props-fix',
    enforce: 'pre',
    async transform(code: string, id: string) {
      if (!filter(id)) return null

      const result = await babel.transformAsync(code, {
        presets: ['@babel/preset-typescript'],
        plugins: [stylexPropsBabelPlugin()],
        filename: id,
        sourceMaps: true,
      })

      return result?.code ? { code: result.code, map: result.map } : null
    },
  }
}

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
    classNameToClassPlugin(),
    fixStylexPropsClassNamePlugin(),
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
