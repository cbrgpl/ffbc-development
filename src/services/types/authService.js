import CONST from '#CONST'
import BaseService from './_baseService'

export default class AuthService extends BaseService {
  constructor () {
    super()

    this._endpoint = 'auth'
  }

  register ( { email, password, passwordConfirmation, phoneNumber }, key = 'register' ) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: arguments[ 0 ]
    }

    options.body.redirectUrl = options.body.redirectUrl ? options.body.redirectUrl : this._redirectUrl

    return this._request( {
      options,
      key,
      expectType: this.responseTypes.json,
    } )
  }

  verifyEmail ( token, key = 'verifyEmail' ) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: { token }
    }

    return this._request( {
      options,
      key,
      expectType: this.responseTypes.json
    } )
  }

  resendVerificationLink ( { email, redirectUrl }, key = 'resendVereficationLink' ) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: arguments[ 0 ]
    }

    options.body.redirectUrl = CONST.CLIENT_URL + options.body.redirectUrl

    return this._request( {
      options,
      key,
      expectType: this.responseTypes.json
    } )
  }

  login ( { email, password }, key = 'login' ) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: arguments[ 0 ]
    }

    return this._request( {
      options,
      key,
      expectType: this.responseTypes.json
    } )
  }

  logout ( { refresh, access }, key = 'logout' ) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${ access }`
      },
      body: { refresh }
    }

    return this._request( {
      options,
      key,
      expectType: this.responseTypes.native
    } )
  }

  requestResetPassword ( { email, redirectUrl }, key = 'requestPasswordReset' ) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: arguments[ 0 ]
    }

    return this._request( {
      options,
      key,
      expectType: this.responseTypes.json
    } )
  }
}
