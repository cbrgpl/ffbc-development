const API_URL = 'http://82.148.16.42/api/v1'
const CLIENT_URL = location.href

const REDIRECT_URL = '/verificate'

const STATUS_WORDS = {
  SUCCESS: 'SUCCESS',
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
  REDIRECT_URL,
  STORAGE_NAMES,
  STATUS_WORDS
}
