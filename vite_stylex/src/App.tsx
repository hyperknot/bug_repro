// @ts-ignore
import { aliasVars } from '@alias/aliasVars.stylex'
import { test } from '@alias/const'
import * as stylex from '@stylexjs/stylex'

// noinspection ES6PreferShortImport
import { outsideVars } from '../../vite_stylex_outside/outsideVars.stylex'
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

  aliasVar: {
    // if I uncomment the line below, it breaks with
    // Could not resolve the path to the imported file.
    // Please ensure that the theme file has a .stylex.js or .stylex.ts extension ...
    // color: aliasVars.color,
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
      JS var from @alias: {test}
      <div {...stylex.props(styles.aliasVar)}>stylex var from @alias/ - blue if works</div>
    </div>
  )
}

export default App
