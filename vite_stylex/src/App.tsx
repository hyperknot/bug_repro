import * as stylex from '@stylexjs/stylex'
import { aliasVars } from '../../vite_stylex_outside/aliasVars.stylex'
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
    color: aliasVars.color,
  },
})

function App() {
  return (
    <div>
      <div {...stylex.props(styles.local)}>local value - red if works</div>
      <div {...stylex.props(styles.srcVar)}>var at ./src - green if works</div>
      <div {...stylex.props(styles.projVar)}>var at ../ - orange if works</div>
      <div {...stylex.props(styles.outsideVar)}>
        var at ../../vite_stylex_outside/ - purple if works
      </div>
      <div {...stylex.props(styles.aliasVar)}>
        var at ../../vite_stylex_outside/ - blue if works
      </div>
    </div>
  )
}

export default App
