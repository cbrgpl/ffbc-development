const API_URL = 'http://82.148.16.42/api/v1'
const CLIENT_URL = location.href

const REDIRECT_URL = '/verificate'

const STATUS_WORDS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}
const NOT_ERROR = 'NOT_ERROR'

// TODO Сделать специальный объект STORAGE_VARIABLES, чтобы не мешать все подряд со всеми константами
const STORAGE_VARIABLES = {
  EMAIL_VERIFICATION: 'var_emailVerified'
}
export {
  NOT_ERROR,
  API_URL,
  CLIENT_URL,
  REDIRECT_URL,
  STORAGE_VARIABLES,
  STATUS_WORDS
}
