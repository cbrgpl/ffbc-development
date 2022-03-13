import { setRefreshInStorage, isLocalStorageUsed } from '@functions'
import store from '@/store'

export default function updateStorageData ( tokens ) {
  if ( tokens === null ) {
    store.commit( 'auth/setIsAuth', false )
    return
  }

  const setInLocalStorage = isLocalStorageUsed()
  setRefreshInStorage( tokens.refresh, setInLocalStorage )
  store.commit( 'auth/setTokens', tokens )
  store.commit( 'auth/setIsAuth', true )
}
