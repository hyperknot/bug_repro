import { aliasNodeConst } from '@repo/shared/aliasNodeConst'
import { aliasNodeVars } from '@shared_outside/aliasNodeVars.stylex'
import { aliasOutsideConst } from '@shared_outside/aliasOutsideConst'
import { aliasOutsideVars } from '@shared_outside/aliasOutsideVars.stylex'

import * as stylex from '@stylexjs/stylex'

// noinspection ES6PreferShortImport
import { outsideVars } from '../../shared/outsideVars.stylex'
import { projVars } from '../projVars.stylex'
import { srcVars } from './srcVars.stylex'

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

  aliasOutsideVar: {
    color: aliasOutsideVars.color,
  },

  aliasNodeVar: {
    color: aliasNodeVars.color,
  },
})

function App() {
  return (
    <div>
      <div {...stylex.props(styles.local)}>stylex local value - red if works</div>
      <div {...stylex.props(styles.srcVar)}>stylex var from ./src/ - green if works</div>
      <div {...stylex.props(styles.projVar)}>stylex var from ../ - orange if works</div>
      <div {...stylex.props(styles.outsideVar)}>
        stylex var from ../../vite_stylex_outside/ - purple if works
      </div>
      {/**/}
      <div>JS var from @shared_outside: {aliasOutsideConst}</div>
      <div {...stylex.props(styles.aliasOutsideVar)}>
        stylex var from @shared_outside - blue if works
      </div>
      {/**/}
      <div>JS var from @shared_node_modules: {aliasNodeConst}</div>
      <div {...stylex.props(styles.aliasNodeVar)}>
        stylex var from @shared_node_modules/ - magenta if works
      </div>
    </div>
  )
}

export default App
