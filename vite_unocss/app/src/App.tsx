import { AliasComponent } from '@alias/component'
import { aliasConst } from '@alias/const'
import { WorkspaceComponent } from '@repo/workspace/component'
import { workspaceConst } from '@repo/workspace/const'

import { OutsideComponent } from '../../outside/component'
import { outsideConst } from '../../outside/const'

function App() {
  return (
    <div>
      <div class="text-red">local value - red if works</div>
      <div class="text-src">var from ./src/ - green if works</div>
      <div class="text-proj">var from ../ - orange if works</div>

      <div>JS var from ../outside: {outsideConst}</div>
      <div class="text-outside">stylex var from ../outside - purple if works</div>
      <OutsideComponent />

      <div>JS var from @alias: {aliasConst}</div>
      <div class="text-alias">stylex var from @alias - blue if works</div>
      <AliasComponent />

      <div>JS var from @repo/workspace: {workspaceConst}</div>
      <div class="text-workspace">stylex var from @repo/workspace - magenta if works</div>
      <WorkspaceComponent />
    </div>
  )
}

export default App
