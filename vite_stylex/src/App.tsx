import * as stylex from '@stylexjs/stylex'
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

  // this has no effect
  projVar: {
    color: projVars.color,
  },

  // Uncommenting this breaks with
  // "Could not resolve the path to the imported file.
  // Please ensure that the theme file has a .stylex.js or .stylex.ts extension and follows the rules for defining variables:"
  outsideVar: {
    color: outsideVars.color,
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
    </div>
  )
}

export default App
