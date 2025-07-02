import assert from 'node:assert'
import * as babel from '@babel/core'
import { createFilter, type Plugin } from 'vite'

// Fix props function in node_modules/stylex

const fixStylexPropsBabelPlugin = (): babel.PluginObj => ({
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

export function fixStylexPropsPlugin(): Plugin {
  const filter = createFilter('**/@stylexjs/stylex/**/stylex.mjs')

  return {
    name: 'stylex-props-fix',
    async transform(code: string, id: string) {
      if (!filter(id)) return null

      const result = await babel.transformAsync(code, {
        presets: ['@babel/preset-typescript'],
        plugins: [fixStylexPropsBabelPlugin()],
        filename: id,
        sourceMaps: true,
      })

      assert(!result?.code?.includes('.className'))

      return result?.code ? { code: result.code, map: result.map } : null
    },
  }
}
