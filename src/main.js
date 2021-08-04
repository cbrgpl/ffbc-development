import { createApp } from 'vue'
import App from './App.vue'

import './helpers/zExtendBaseTypes'
import '@scss/_predefined.scss'

import lazyImage from '@directives/lazyImage.directive.js'
import tooltip from '@directives/tooltip.directive.js'

import router from './router'
import store from './store'

import dialogPlugin from '@plugins/dialog.plugin'

const app = createApp( App )

app.use( store )
  .use( router )

app.directive( 'lazy-image', lazyImage )
  .directive( 'tooltip', tooltip )

app.use( dialogPlugin )

app.mount( '#app' )
