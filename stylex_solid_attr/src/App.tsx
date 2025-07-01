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

  dynamic: (marginLeft) => ({
    marginLeft,
    color: 'blue',
    textDecoration: null,
  }),
})

function App() {
  console.log({ ...stylex.props(styles.local) })
  console.log({ ...stylex.attrs(styles.local) })

  console.log({ ...stylex.props(styles.local, styles.dynamic('14px')) })
  console.log({ ...stylex.attrs(styles.local, styles.dynamic('14px')) })

  return (
    <div>
      <div {...sx(styles.local)} style={{ 'margin-left': '30px' }}>
        sx local value - big red if works
      </div>
      <div {...sx(styles.srcVar)}>sx var from ./src/ - green if works</div>
      <div {...sx(styles.projVar)} style="margin-eft: 14px;">
        sx var from ../ - orange if works
      </div>
      <div {...sx(styles.local, styles.dynamic('15px'))}>
        sx dynamic - 14px blue underlined if works
      </div>

      <div {...attrs(stylex.props(styles.local))}>attr local value - red if works</div>
      <div {...attrs(stylex.props(styles.srcVar))}>attr var from ./src/ - green if works</div>
      <div {...attrs(stylex.props(styles.projVar))}>attr var from ../ - orange if works</div>
      <div {...attrs(stylex.props(styles.local, styles.dynamic('14px')))}>
        attrs dynamic - 14px blue underlined if works
      </div>

      <div {...stylex.props(styles.local)}>props local value - red if works</div>
      <div {...stylex.props(styles.srcVar)}>props var from ./src/ - green if works</div>
      <div {...stylex.props(styles.projVar)}>props var from ../ - orange if works</div>
      <div {...stylex.props(styles.local, styles.dynamic('14px'))}>
        props dynamic - 14px blue underlined if works
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
      <div {...stylex.attrs(styles.local, styles.dynamic('14px'))}>
        native attr (only works on 0.12) dynamic - 14px blue underlined if works
      </div>
    </div>
  )
}

export default App
