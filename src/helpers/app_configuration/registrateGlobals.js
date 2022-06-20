import eventBus from './eventBus'

import { registrateGlobalSafely } from './_utils/registrateGlobalSafely.js'

export const registrateGlobals = () => {
  registrateGlobalSafely( 'bus', eventBus )
}
