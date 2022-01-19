const NOT_ERROR = 'NOT_ERROR'
const ERROR_HANDLER_STATUSES = [ /5\d\d/g ]
const API_URL = 'http://82.148.16.42/api/v1'
const CLIENT_URL = location.href
const REDIRECT_URL = '/verificate'
const VERIFICATION_STORAGE_VAR = 'var_emailVerified'
const STATUS_WORDS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

export {
  NOT_ERROR,
  ERROR_HANDLER_STATUSES,
  API_URL,
  CLIENT_URL,
  REDIRECT_URL,
  VERIFICATION_STORAGE_VAR,
  STATUS_WORDS
}
