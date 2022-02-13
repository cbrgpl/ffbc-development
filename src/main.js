import { createApp } from 'vue'

import '@scss/_predefined.scss'
import { registerCustomVueFunctional } from '@/helpers/app_configuration'

import router from './router'
import store from './store'

import App from './App.vue'

// eslint-disable-next-line no-unused-expressions
import( /* webpackPreload: true */ '@services' )

const app = createApp( App )

registerCustomVueFunctional( app )

app.use( store ).use( router )

app.mount( '#app' )

export { app }
