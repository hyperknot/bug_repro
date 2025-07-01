/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.tsx'

import 'virtual:uno.css'

const root = document.getElementById('root')

render(() => <App />, root!)
