import CONST from '#CONST'

const API_URL = CONST.API_URL

export default {
  auth: {
    register: `${ API_URL }/auth/register/`,
    login: `${ API_URL }/auth/login/`,
    resendVereficationLink: `${ API_URL }/auth/resend-verification-link/`,
    loginRefresh: `${ API_URL }/auth/login/refresh/`,
    verifyEmail: `${ API_URL }/auth/verify-email/`,
    logout: `${ API_URL }/auth/logout/`,
    requestPasswordReset: `${ API_URL }/auth/request-reset-password/`
  },
  token: {
    refresh: `${ API_URL }/auth/login/refresh/`
  },
  user: {
    me: `${ API_URL }/user/me/`,
    meEdit: `${ API_URL }/user/me/edit/`,
    meUploadAvatar: `${ API_URL }/user/me/upload-avatar`
  },
  server: {
    healthCheck: `${ API_URL }/health-check/`,
  }
}
