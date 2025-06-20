import * as stylex from '@stylexjs/stylex'
import { spacing } from './tokens.stylex'

const styles = stylex.create({
  base: {
    color: 'red',
    fontSize: spacing.xxlarge,
  },
})

function App() {
  return <div {...stylex.props(styles.base)}>Big Red if works</div>
}

export default App
