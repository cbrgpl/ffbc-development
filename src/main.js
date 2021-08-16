import { createApp } from 'vue'
import App from './App.vue'

import './helpers/zExtendBaseTypes'
import '@scss/_predefined.scss'

import CONST from '#CONST'
import globalFunctional from './globalFunctional.js'
import consoleLogger from '@classes/consoleLogger.class.js'

import router from './router'
import store from './store'

const app = createApp( App )

for ( const plugin of Object.keys( globalFunctional.plugins ) ) {
  app.use( globalFunctional.plugins[ plugin ] )
}

app.use( store ).use( router )

for ( const component of Object.keys( globalFunctional.components ) ) {
  app.component( component, globalFunctional.components[ component ] )
}

for ( const directive of Object.keys( globalFunctional.directives ) ) {
  app.directive( directive, globalFunctional.directives[ directive ] )
}

app.config.globalProperties.CONST$ = CONST
app.config.globalProperties.log$ = consoleLogger

app.mount( '#app' )

export { app }
