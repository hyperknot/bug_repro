import assert from 'node:assert'
import * as babel from '@babel/core'
import { createFilter, type Plugin } from 'vite'

// Helper function to recursively transform className to class in object expressions
const transformObjectExpression = (objExpr: babel.types.ObjectExpression) => {
  objExpr.properties.forEach((prop) => {
    if (prop.type === 'ObjectProperty') {
      // Handle direct className properties
      if (prop.key.type === 'Identifier' && prop.key.name === 'className') {
        prop.key.name = 'class'
      }
      // Handle nested objects that might contain className
      else if (prop.value.type === 'ObjectExpression') {
        transformObjectExpression(prop.value)
      }
    }
  })
}

const classNameToClassBabelPlugin = (): babel.PluginObj => ({
  name: 'className-to-class',
  visitor: {
    JSXSpreadAttribute(path) {
      const argument = path.node.argument

      // Handle direct object expressions: {...{className: "..."}}
      if (argument.type === 'ObjectExpression') {
        transformObjectExpression(argument)
      }
      // Handle member expressions: {...{0: {className: "..."}}[index]}
      else if (
        argument.type === 'MemberExpression' &&
        argument.object.type === 'ObjectExpression'
      ) {
        transformObjectExpression(argument.object)
      }
    },
  },
})

export function classNameToClassPlugin(): Plugin {
  const filter = createFilter('**/*.{jsx,tsx}', '**/node_modules/**')

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

      // only because of the styleUtils case, in production this can be enabled back
      // assert(!result?.code?.includes('className'))

      return result?.code ? { code: result.code, map: result.map } : null
    },
  }
}
