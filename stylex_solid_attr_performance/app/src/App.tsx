import { AliasComponent } from '@alias/component'
import { aliasConst } from '@alias/const'
import { aliasVars } from '@alias/vars.stylex'
import { WorkspaceComponent } from '@repo/workspace/component'
import { workspaceConst } from '@repo/workspace/const'
import { workspaceVars } from '@repo/workspace/vars.stylex'
import * as stylex from '@stylexjs/stylex'
import { OutsideComponent } from '../../outside/component'
import { outsideConst } from '../../outside/const'
import { outsideVars } from '../../outside/vars.stylex'
import { projVars } from '../vars.stylex'
import { sx } from '@alias/styleUtils'
import { srcVars } from './vars.stylex'

const styles = stylex.create({
  local: {
    color: 'red',
  },

  srcVar: {
    color: srcVars.color,
  },

  projVar: {
    color: projVars.color,
  },

  outsideVar: {
    color: outsideVars.color,
  },

  aliasVar: {
    color: aliasVars.color,
  },

  workspaceVar: {
    color: workspaceVars.color,
  },
})

function App() {
  return (
    <div>
      <div {...sx(styles.local)}>stylex local value - red if works</div>
      <div {...sx(styles.srcVar)}>stylex var from ./src/ - green if works</div>
      <div {...sx(styles.projVar)}>stylex var from ../ - orange if works</div>

      <div>JS var from ../outside: {outsideConst}</div>
      <div {...sx(styles.outsideVar)}>stylex var from ../outside - purple if works</div>
      <OutsideComponent />

      <div>JS var from @alias: {aliasConst}</div>
      <div {...sx(styles.aliasVar)}>stylex var from @alias - blue if works</div>
      <AliasComponent />

      <div>JS var from @repo/workspace: {workspaceConst}</div>
      <div {...sx(styles.workspaceVar)}>stylex var from @repo/workspace - magenta if works</div>
      <WorkspaceComponent />
    </div>
  )
}

export default App
