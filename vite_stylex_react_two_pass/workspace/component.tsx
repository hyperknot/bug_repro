// @ts-expect-error
import * as stylex from '@stylexjs/stylex'

import { workspaceVars } from './vars.stylex'

const styles = stylex.create({
  base: {
    background: '#ddd',
    color: workspaceVars.color,
  },
})

export function WorkspaceComponent() {
  // @ts-expect-error
  return <div {...stylex.props(styles.base)}>component from ../workspace</div>
}
