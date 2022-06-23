import deepFreeze from '@functions/deepFreeze'
import { registrateGlobalSafely } from '../_utils/registrateGlobalSafely'

const CLIENT_URL = location.origin

const STATUS_WORDS = {
  SUCCESS: 'SUCCESS',
  NOT_ERROR: 'NOT_ERROR',
  ERROR: 'ERROR',
}

const REDIRECT_URLS = {
  VERIFICATE_EMAIL: CLIENT_URL + '/verificate',
  RESET_PASSWORD: CLIENT_URL + '/reset-password',
}

const NOT_ERROR = 'NOT_ERROR'

const STORAGE_NAMES = {
  EMAIL_VERIFICATED: 'flag_emailVerified',
  REGISTRATED_EMAIL: 'var_regEmail',
  REFRESH_TOKEN: 'var_refreshToken',
  LOCAL_CART: 'var_localCart'
}

const TEMPLATE_IMG = require( '@images/shop/blur-template.png' )

const consts = deepFreeze( {
  NOT_ERROR,
  CLIENT_URL,
  STORAGE_NAMES,
  STATUS_WORDS,
  REDIRECT_URLS,
  TEMPLATE_IMG
} )

export const registrateConstsGlobally = () => {
  for ( const constName in consts ) {
    registrateGlobalSafely( constName, consts[ constName ] )
  }
}
