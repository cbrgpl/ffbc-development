const BACKEND_ADDRESS = '9799-178-88-196-208.ngrok.io'

const API_URL = `http://${ BACKEND_ADDRESS }/api`

const CLIENT_URL = location.origin

const STATUS_WORDS = {
  SUCCESS: 'SUCCESS',
  NOT_ERROR: 'NOT_ERROR',
  ERROR: 'ERROR',
}
const NOT_ERROR = 'NOT_ERROR'

const STORAGE_NAMES = {
  EMAIL_VERIFICATED: 'flag_emailVerified',
  REGISTRATED_EMAIL: 'var_regEmail',
  REFRESH_TOKEN: 'var_refreshToken'
}

export {
  NOT_ERROR,
  API_URL,
  CLIENT_URL,
  STORAGE_NAMES,
  STATUS_WORDS
}
