import { createApp } from 'vue'
import { registrateVueFunctionality } from '@/helpers/app_configuration'

import router from './router'
import store from './store'

import App from './App.vue'

const app = createApp( App )

registrateVueFunctionality( app )

app.use( store ).use( router )
app.mount( '#app' )

const config = app.config

export {
  app,
  config,
}
