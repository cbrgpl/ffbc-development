import CONST from '#CONST'

const API_URL = CONST.API_URL

export default {
  auth: {
    register: `${ API_URL }/auth/register/`,
    login: `${ API_URL }/auth/login`,
    resendVereficationLink: `${ API_URL }/auth/resend-verification-link/`,
    loginRefresh: `${ API_URL }/auth/login/refresh/`,
    verifyEmail: `${ API_URL }/auth/verify-email/`,
    logout: `${ API_URL }/auth/logout/`,
  },
  server: {
    healthCheck: `${ API_URL }/health-check/`,
  }
}
