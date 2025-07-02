import type { TransformOptions } from '@babel/core'
import * as babel from '@babel/core'
// @ts-ignore
import stylexPostcss from '@stylexjs/postcss-plugin'
import { createFilter, type Plugin } from 'vite'

export function stylexPlugin(stylexBabelConfig: TransformOptions): Plugin {
  const filter = createFilter('**/*.{js,ts,jsx,tsx}', '**/node_modules/**')

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
