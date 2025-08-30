/* @refresh reload */

import { AppUI } from '@shared/components/AppUI'
import { render } from 'solid-js/web'

import '@shared/styles/tailwind/_tailwind.css' // OK
// import '@shared/styles/_stylesheet.css' // broken

const root = document.getElementById('root')
render(() => <AppUI />, root!)
