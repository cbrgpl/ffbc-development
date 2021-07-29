import { createStore } from 'vuex'

import ui from './modules/ui.js'
import auth from './modules/auth.js'

export default createStore( {
  // TODO Нужно будет реализовать логику модуля контроллера popup'ов и notification'ов
  modules: {
    ui,
    auth
  }
} )
