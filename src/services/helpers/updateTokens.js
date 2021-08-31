import endpoints from '@services/endpoints'
import $store from '@/store'
import $router from '@/router'

export default async function () {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify( { refresh: $store.getters[ 'token/refresh' ] } )
  }

  const response = await fetch( endpoints.token.refresh, options )
  const responseData = await response.json()

  if ( response.status === 401 ) {
    $store.commit( 'auth/setIsAuth', false )
    $store.commit( 'user/clearUserData' )
    $router.push( { name: 'Preview' } )
  }

  $store.commit( 'token/setTokens', responseData )

  return response
}
