import { createStore } from 'vuex'

import ui from './modules/ui.js'
import auth from './modules/auth.js'
import token from './modules/token.js'
import user from './modules/user.js'

export default createStore( {
  modules: {
    ui,
    auth,
    token,
    user,
  }
} )
