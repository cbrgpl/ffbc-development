export default {
  NOT_ERROR: 'NOT_ERROR',
  ERROR_HANDLER_STATUSES: [ /5\d\d/g ],
  API_URL: process.env.VUE_APP_BACKEND_URL,
  CLIENT_URL: location.href,
  REDIRECT_URL: '/verificate',
  VERIFICATION_STORAGE_VAR: 'var_emailVerified',
  STATUS_WORDS: {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  }
}
