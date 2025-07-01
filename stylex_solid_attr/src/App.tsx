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
  const a = stylex.props(styles.local)
  const b = stylex.attrs(styles.local)
  const c = stylex.props(styles.local, styles.dynamic(30))
  const d = stylex.attrs(styles.local, styles.dynamic(30))

  console.log(a)
  console.log(b)
  console.log(c)
  console.log(d)

  return (
    <div>
      <div {...sx(styles.local)} style={{ 'margin-left': '30px' }}>
        sx local value - big red if works
      </div>
      <div {...sx(styles.srcVar)}>sx var from ./src/ - green if works</div>
      <div {...sx(styles.projVar)} style="margin-left: 30px;">
        sx var from ../ - orange if works
      </div>
      <div {...sx(styles.local, styles.dynamic(30))}>
        sx dynamic - 14px blue underlined if works
      </div>

      <div {...attrs(stylex.props(styles.local))} style={{ '--marginLeft': '30px' }}>
        attr local value - red if works
      </div>
      <div {...attrs(stylex.props(styles.srcVar))} style="--marginLeft:30px;">
        attr var from ./src/ - green if works
      </div>
      <div {...attrs(stylex.props(styles.projVar))}>attr var from ../ - orange if works</div>
      <div {...attrs(stylex.props(styles.local, styles.dynamic(30)))}>
        attrs dynamic - 14px blue underlined if works
      </div>

      <div {...stylex.props(styles.local)}>props local value - red if works</div>
      <div {...stylex.props(styles.srcVar)}>props var from ./src/ - green if works</div>
      <div {...stylex.props(styles.projVar)}>props var from ../ - orange if works</div>
      <div {...stylex.props(styles.local, styles.dynamic(30))}>
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
