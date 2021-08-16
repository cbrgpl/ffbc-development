import CONST from '#CONST'
import BaseService from './_baseService'

export default class AuthService extends BaseService {
  constructor ( redirectUrl ) {
    super()

    this._redirectUrl = CONST.CLIENT_URL + CONST.REDIRECT_URL
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

  resendVerificationLink ( { email }, key = 'resendVereficationLink' ) {
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

  logout ( { refresh }, key = 'logout' ) {
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
