import * as stylex from '@stylexjs/stylex'

import { aliasVars } from './vars.stylex'

const styles = stylex.create({
  base: {
    background: '#ddd',
    color: aliasVars.color,
  },
})

export function AliasComponent() {
  return <div {...stylex.props(styles.base)}>component from ../alias</div>
}
