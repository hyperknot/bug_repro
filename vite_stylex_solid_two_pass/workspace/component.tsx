import * as stylex from '@stylexjs/stylex'
import { sx } from '@alias/styleUtils'
import { workspaceVars } from './vars.stylex'

const styles = stylex.create({
  base: {
    background: '#ddd',
    color: workspaceVars.color,
  },
})

export function WorkspaceComponent() {
  return <div {...sx(styles.base)}>component from ../workspace</div>
}
