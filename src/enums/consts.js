const BACKEND_ADDRESS = 'rainbow-siege-developers.ru'

const API_URL = `https://${ BACKEND_ADDRESS }/api`

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
  REFRESH_TOKEN: 'var_refreshToken'
}

export {
  NOT_ERROR,
  API_URL,
  CLIENT_URL,
  STORAGE_NAMES,
  STATUS_WORDS,
  REDIRECT_URLS
}
