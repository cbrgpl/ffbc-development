import { createStore } from 'vuex'

import ui from './modules/ui.js'
import auth from './modules/auth.js'
import user from './modules/user.js'
import product from './modules/product.js'
import measure from './modules/measure.js'
import order from './modules/order.js'

const modules = {
  ui,
  auth,
  user,
  product,
  measure,
  order
}

const store = createStore( {
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

export default store
