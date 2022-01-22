import { createStore } from 'vuex'

import ui from './modules/ui.js'
import auth from './modules/auth.js'
import token from './modules/token.js'
import user from './modules/user.js'

const modules = {
  ui,
  auth,
  token,
  user,
}

export default createStore( {
  modules,
  mutations: {
    clearModules () {
      for ( const moduleName in modules ) {
        const module = modules[ moduleName ]

        if ( module.clearable ) {
          this.commit( moduleName + '/clearModule' )
        }
      }
    }
  }
} )
