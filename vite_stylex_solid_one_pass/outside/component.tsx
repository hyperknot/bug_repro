import { sx } from '@alias/styleUtils'
import * as stylex from '@stylexjs/stylex'

import { outsideVars } from './vars.stylex'

const styles = stylex.create({
  base: {
    background: '#ddd',
    color: outsideVars.color,
  },
})

export function OutsideComponent() {
  return <div {...sx(styles.base)}>component from ../outside</div>
}
