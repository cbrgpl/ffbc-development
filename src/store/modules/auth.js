import { STORAGE_NAMES } from 'consts'

import getActionResultDTO from '../helpers/getActionResultDTO'
import { NetworkAttemptError } from '@errors'
import { authService } from '@services'

export default {
  namespaced: true,
  clearable: true,
  getters: {
    isAuth: state => {
      return state.isAuth
    },
    accessToken ( state ) {
      return state.tokens.access
    },
    refreshToken ( state ) {
      return state.tokens.refresh
    },
    tokens ( state ) {
      return state.tokens
    }
  },
  actions: {
    async logIn ( { dispatch, commit }, logInForm ) {
      const logInRequest = await authService.logIn( logInForm )

      if ( logInRequest.httpResponse.status === 200 ) {
        commit( 'setAuthorizeInfo', logInRequest.parsedBody.tokens )
        await dispatch( 'user/getUser', null, { root: true } )
      }

      return getActionResultDTO( logInRequest )
    },
    async logOut ( { rootGetters } ) {
      const refreshToken = rootGetters[ 'auth/refreshToken' ]
      const logOutResponse = await authService.logOut( { refresh: refreshToken } )

      if ( logOutResponse.status !== 204 ) {
        throw new NetworkAttemptError( logOutResponse )
      }
    },
    async outSendResetCode ( context, resetCodeForm ) {
      const resetRequest = await authService.requestResetPassword( resetCodeForm )

      return getActionResultDTO( resetRequest )
    },
    async outSignIn ( context, signInForm ) {
      const signInRequest = await authService.signIn( {
        ...signInForm
      } )

      return getActionResultDTO( signInRequest )
    },
    async resendVerificationLink ( context, resendForm ) {
      const resendRequest = await authService.resendVerificationLink( resendForm )

      if ( resendRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( resendRequest.httpResponse )
      }
    },
    async updatePassword ( context, newPasswordData ) {
      const updatePasswordRequest = await authService.updatePassword( newPasswordData )

      if ( updatePasswordRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( updatePasswordRequest.httpResponse )
      }

      return getActionResultDTO( updatePasswordRequest )
    }
  },
  mutations: {
    setAuthorizeInfo ( state, tokens ) {
      state.isAuth = true
      state.tokens = tokens
    },
    clearModule ( state ) {
      state.isAuth = null
      state.tokens = {
        access: null,
        refresh: null,
      }
    }
  },
  state: {
    isAuth: null,
    tokens: {
      access: null,
      refresh: localStorage.getItem( STORAGE_NAMES.REFRESH_TOKEN ) || sessionStorage.getItem( STORAGE_NAMES.REFRESH_TOKEN ),
    }

  },
}
