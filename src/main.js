import { createApp } from 'vue'
import App from './App.vue'

import './helpers/zExtendBaseTypes'

import '@scss/_predefined.scss'
import lazyImage from '@directives/lazyImage.directive'

import router from './router'
import store from './store'

import handleFetch from '@functions/handleFetch.function'

const app = createApp( App )

app.config.globalProperties.$handleFetch = handleFetch

app.use( store )
  .use( router )

app.directive( 'lazy-image', lazyImage )

app.mount( '#app' )
