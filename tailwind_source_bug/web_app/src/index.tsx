/* @refresh reload */

import { render } from 'solid-js/web'

import '@shared/styles/tailwind/_tailwind.css'
import '@shared/styles/_stylesheet.css'

const root = document.getElementById('root')
render(() => <div>abc</div>, root!)
