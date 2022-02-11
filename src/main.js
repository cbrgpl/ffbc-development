import { createApp } from 'vue'
import App from './App.vue'

import '@scss/_predefined.scss'
import { registerCustomVueFunctional } from '@/helpers/app_configuration'

import router from './router'
import store from './store'

const app = createApp( App )

registerCustomVueFunctional( app )

app.use( store ).use( router )

app.mount( '#app' )

export { app }
