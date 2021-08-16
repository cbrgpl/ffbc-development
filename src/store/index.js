import { createStore } from 'vuex'

import ui from './modules/ui.js'
import auth from './modules/auth.js'

export default createStore( {
  modules: {
    ui,
    auth,
  }
} )
