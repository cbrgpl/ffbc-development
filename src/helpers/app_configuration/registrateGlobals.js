import eventBus from './eventBus'
import { registrateConstsGlobally } from './consts/index.js'

import { registrateGlobalSafely } from './_utils/registrateGlobalSafely.js'

export const registrateGlobals = () => {
  registrateGlobalSafely( 'bus', eventBus )
  registrateConstsGlobally()
}
