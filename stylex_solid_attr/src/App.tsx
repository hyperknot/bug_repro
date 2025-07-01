import * as stylex from '@stylexjs/stylex'
import { projVars } from '../vars.stylex'
import { attrs, sx } from './styleUtils'
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
})

function App() {
  return (
    <div>
      <div {...sx(styles.local)}>sx local value - red if works</div>
      <div {...sx(styles.srcVar)}>sx var from ./src/ - green if works</div>
      <div {...sx(styles.projVar)}>sx var from ../ - orange if works</div>

      <div {...attrs(stylex.props(styles.local))}>attr local value - red if works</div>
      <div {...attrs(stylex.props(styles.srcVar))}>attr var from ./src/ - green if works</div>
      <div {...attrs(stylex.props(styles.projVar))}>attr var from ../ - orange if works</div>
    </div>
  )
}

export default App
