import $store from '@/store'
import $router from '@/router'
import { app } from '@/main'
import { userService } from '@services'

import endpoints from '@services/endpoints'
import { STORAGE_NAMES } from 'consts'

function updateStorageTokens ( token ) {
  if ( localStorage.getItem( STORAGE_NAMES.REFRESH_TOKEN ) ) {
    localStorage.setItem( STORAGE_NAMES.REFRESH_TOKEN, token )
  } else if ( sessionStorage.getItem( STORAGE_NAMES.REFRESH_TOKEN ) ) {
    sessionStorage.setItem( STORAGE_NAMES.REFRESH_TOKEN, token )
  }
}

function clearStorageTokens ( token ) {
  localStorage.removeItem( STORAGE_NAMES.REFRESH_TOKEN )
  sessionStorage.removeItem( STORAGE_NAMES.REFRESH_TOKEN )
}

async function actInAccordanceStatus ( responseStatus, tokens ) {
  if ( responseStatus === 200 ) {
    const userDataResponse = await userService.me( $store.getters[ 'token/access' ] )
    $store.commit( 'user/setUserData', userDataResponse.data )
    $store.commit( 'user/addRole', 'authorized' )
    $store.commit( 'auth/setIsAuth', true )

    $store.commit( 'token/setTokens', tokens )
    updateStorageTokens( tokens.refresh )
  } else {
    $store.commit( 'clearModules' )
    clearStorageTokens()
    $store.commit( 'auth/setIsAuth', false )

    app.config.globalProperties.toast$.info( {
      summary: 'You are no longer authorized',
      detail: 'It seems you’ve been off the site too long, now you need to re-authorise'
    } )

    $router.push( { name: 'Preview' } )
  }
}

async function requestNewTokens ( refreshToken ) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify( { refresh: refreshToken } )
  }

  const response = await fetch( endpoints.token.refresh, options )
  const responsePayload = await response.json()

  return {
    response,
    responsePayload
  }
}

export default async function checkAuthToken ( refreshToken ) {
  const tokensRequest = await requestNewTokens( refreshToken )
  actInAccordanceStatus( tokensRequest.response.status, tokensRequest.responsePayload )
}
