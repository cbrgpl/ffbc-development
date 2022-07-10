import eventBus from './eventBus'
import { registrateConstsGlobally } from './consts'

import { registrateGlobalSafely } from './_utils/registrateGlobalSafely.js'

export const registrateGlobals = () => {
  registrateGlobalSafely( 'bus', eventBus )
  registrateConstsGlobally()
}
