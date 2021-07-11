import { createStore } from 'vuex'

import ui from './modules/ui.js'

export default createStore( {
  modules: {
    ui
  }
} )
