import * as stylex from '@stylexjs/stylex'
import { projVars } from '../vars.stylex'
import { attrs, sx } from './styleUtils'
import { srcVars } from './vars.stylex'

const styles = stylex.create({
  local: {
    color: 'red',
    fontSize: '22px',
    textDecoration: 'underline',
  },

  srcVar: {
    color: srcVars.color,
  },

  projVar: {
    color: projVars.color,
  },

  dynamic: (fontSize) => ({
    fontSize,
  }),
})

function App() {
  const inline = { color: 'blue', fontSize: '16px', textDecoration: 'underline' }

  return (
    <div>
      <div {...sx(styles.local)}>sx local value - big red if works</div>
      <div {...sx(styles.srcVar)}>sx var from ./src/ - green if works</div>
      <div {...sx(styles.projVar)}>sx var from ../ - orange if works</div>
      <div {...sx(styles.local, inline)}>sx inline - small blue underlined if works</div>

      <div {...attrs(stylex.props(styles.local))}>attr local value - red if works</div>
      <div {...attrs(stylex.props(styles.srcVar))}>attr var from ./src/ - green if works</div>
      <div {...attrs(stylex.props(styles.projVar))}>attr var from ../ - orange if works</div>
      <div {...attrs(stylex.props(styles.local, styles.dynamic('14px')))}>
        attrs dynamic - 14px blue underlined if works
      </div>

      <div {...stylex.props(styles.local)}>props local value - red if works</div>
      <div {...stylex.props(styles.srcVar)}>props var from ./src/ - green if works</div>
      <div {...stylex.props(styles.projVar)}>props var from ../ - orange if works</div>
      <div {...stylex.props(styles.local, styles.dynamic)}>
        sx inline - small blue underlined if works
      </div>

      <div {...stylex.attrs(styles.local)}>
        native attr (only works on 0.12) local value - red if works
      </div>
      <div {...stylex.attrs(styles.srcVar)}>
        native attr (only works on 0.12) var from ./src/ - green if works
      </div>
      <div {...stylex.attrs(styles.projVar)}>
        native attr (only works on 0.12) var from ../ - orange if works
      </div>
      <div {...stylex.attrs(styles.local, inline)}>
        native attr (only works on 0.12) inline - small blue underlined if works
      </div>
    </div>
  )
}

export default App
