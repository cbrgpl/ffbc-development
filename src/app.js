import { createApp } from 'vue'
import { registrateVueFunctionality } from '@/configuration/vue'

import router from './router'
import store from './store'

import App from './App.vue'



const app = createApp( App )

registrateVueFunctionality( app )

app.use( store ).use( router )
app.mount( '#app' )

// App config modifications
app.config.unwrapInjectedRef = true

const config = app.config

export {
  app,
  config,
}
