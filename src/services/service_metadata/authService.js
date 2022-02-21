import { API_URL } from 'consts'

const authApiModule = [
  {
    method: 'POST',
    url: API_URL + '/auth/register/',
    secure: false,
    roles: [],
    handler: 'signIn',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'email', 'password', 'passwordConfirmation', 'phoneNumber' ],
      properties: {
        email: {
          type: 'string'
        },
        password: {
          type: 'string'
        },
        passwordConfirmation: {
          type: 'string',
        },
        phoneNumber: {
          type: 'string'
        }
      }
    }
  },
  {
    method: 'POST',
    url: API_URL + '/auth/verify-email/',
    secure: false,
    roles: [],
    handler: 'verifyEmail',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'token' ],
      properties: {
        token: {
          type: 'string'
        }
      }
    }
  },
  {
    method: 'POST',
    url: API_URL + '/auth/resend-verification-link/',
    secure: false,
    roles: [],
    handler: 'resendVerificationLink',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'email', 'redirectUrl' ],
      properties: {
        email: {
          type: 'string'
        },
        redirectUrl: {
          type: 'string'
        }
      }
    }
  },
  {
    method: 'POST',
    url: API_URL + '/auth/login/',
    secure: false,
    roles: [],
    handler: 'logIn',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    schema: {
      type: 'object',
      required: [ 'email', 'password' ],
      properties: {
        email: {
          type: 'string'
        },
        password: {
          type: 'string',
        },
      }
    }
  },
  {
    method: 'POST',
    url: API_URL + '/auth/logout/',
    secure: true,
    roles: [],
    handler: 'logOut',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ''
    },
    schema: {
      type: 'object',
      required: [ 'refresh' ],
      properties: {
        refresh: {
          type: 'string'
        }
      }
    }
  },
  {
    method: 'POST',
    url: API_URL + '/auth/request-reset-password/',
    secure: false,
    roles: [],
    handler: 'requestResetPassword',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    schema: {
      type: 'object',
      required: [ 'email', 'redirectUrl' ],
      properties: {
        email: {
          type: 'string'
        },
        redirectUrl: {
          type: 'string'
        }
      }
    }
  },
  {
    method: 'POST',
    url: API_URL + '/auth/set-new-password/',
    secure: false,
    roles: [],
    handler: 'setNewPassword',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    schema: {
      type: 'object',
      required: [ 'password', 'passwordConfirmation', 'token', 'uidb64' ],
      properties: {
        password: {
          type: 'string'
        },
        passwordConfirmation: {
          type: 'string'
        },
        token: {
          type: 'string'
        },
        uidb64: {
          type: 'string'
        }
      }
    }
  },
  {
    method: 'POST',
    url: API_URL + '/auth/login/refresh/',
    secure: false,
    roles: [],
    handler: 'updateTokens',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    schema: {
      type: 'object',
      required: [ 'refresh' ],
      properties: {
        refresh: {
          type: 'string'
        }
      }
    }
  },
  {
    method: 'POST',
    url: API_URL + '/auth/update-user-password/',
    secure: true,
    roles: [],
    handler: 'updatePassword',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    schema: {
      type: 'object',
      required: [ 'password', 'passwordConfirmation' ],
      properties: {
        password: {
          type: 'string',
          minLength: 6,
          maxLength: 68,
        },
        passwordConfirmation: {
          type: 'string',
          minLength: 6,
          maxLength: 68,
        }
      }
    }
  }
]

export default authApiModule
