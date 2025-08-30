// @ts-expect-error
import * as stylex from '@stylexjs/stylex'

import { outsideVars } from './vars.stylex'

const styles = stylex.create({
  base: {
    background: '#ddd',
    color: outsideVars.color,
  },
})

export function OutsideComponent() {
  // @ts-expect-error
  return <div {...stylex.props(styles.base)}>component from ../outside</div>
}
