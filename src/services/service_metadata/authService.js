import { CLIENT_URL } from '@/enums/consts'
import { API_URL } from 'consts'

// auth: {
//   register: `${ API_URL }/auth/register/`,
//   login: `${ API_URL }/auth/login/`,
//   resendVereficationLink: `${ API_URL }/auth/resend-verification-link/`,
//   loginRefresh: `${ API_URL }/auth/login/refresh/`,
//   verifyEmail: `${ API_URL }/auth/verify-email/`,
//   logout: `${ API_URL }/auth/logout/`,
//   requestPasswordReset: `${ API_URL }/auth/request-reset-password/`
// },

const authApiModule = [
  {
    method: 'POST',
    url: API_URL + '/auth/login/',
    secure: false,
    roles: [],
    handler: 'login',
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

  }
]

export default authApiModule

// class AuthService extends BaseService {
//   register ( { email, password, passwordConfirmation, phoneNumber }, key = 'register' ) {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: arguments[ 0 ]
//     }

//     options.body.redirectUrl = options.body.redirectUrl ? options.body.redirectUrl : this._redirectUrl

//     return this._request( {
//       options,
//       key,
//       expectType: this.responseTypes.json,
//     } )
//   }

//   verifyEmail ( token, key = 'verifyEmail' ) {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: { token }
//     }

//     return this._request( {
//       options,
//       key,
//       expectType: this.responseTypes.json
//     } )
//   }

//   resendVerificationLink ( { email, redirectUrl }, key = 'resendVereficationLink' ) {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: arguments[ 0 ]
//     }

//     options.body.redirectUrl = CLIENT_URL + options.body.redirectUrl

//     return this._request( {
//       options,
//       key,
//       expectType: this.responseTypes.json
//     } )
//   }

//   login ( { email, password }, key = 'login' ) {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: arguments[ 0 ]
//     }

//     return this._request( {
//       options,
//       key,
//       expectType: this.responseTypes.json
//     } )
//   }

//   logout ( { refresh, access }, key = 'logout' ) {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: `Bearer ${ access }`
//       },
//       body: { refresh }
//     }

//     return this._request( {
//       options,
//       key,
//       expectType: this.responseTypes.native
//     } )
//   }

//   requestResetPassword ( { email, redirectUrl }, key = 'requestPasswordReset' ) {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: arguments[ 0 ]
//     }

//     return this._request( {
//       options,
//       key,
//       expectType: this.responseTypes.json
//     } )
//   }
// }
