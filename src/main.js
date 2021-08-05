import { createApp } from 'vue'
import App from './App.vue'

import './helpers/zExtendBaseTypes'
import '@scss/_predefined.scss'

import globalFunctional from './globalFunctional.js'

import router from './router'
import store from './store'

const app = createApp( App )

app.use( store ).use( router )

for ( const component of Object.keys( globalFunctional.components ) ) {
  app.component( component, globalFunctional.components[ component ] )
}

for ( const directive of Object.keys( globalFunctional.directives ) ) {
  app.directive( directive, globalFunctional.directives[ directive ] )
}

for ( const plugin of Object.keys( globalFunctional.plugins ) ) {
  app.use( globalFunctional.plugins[ plugin ] )
}

app.mount( '#app' )
