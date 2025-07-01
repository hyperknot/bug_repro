import * as stylex from '@stylexjs/stylex'
import { sx } from './styleUtils'

import { aliasVars } from './vars.stylex'

const styles = stylex.create({
  base: {
    background: '#ddd',
    color: aliasVars.color,
  },
})

export function AliasComponent() {
  return <div {...sx(styles.base)}>component from ../alias</div>
}
