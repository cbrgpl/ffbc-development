import { setRefreshInStorage, isLocalStorageUsed } from '@functions'

export default function updateTokensInStorages ( store, tokens ) {
  const setInLocalStorage = isLocalStorageUsed()
  setRefreshInStorage( tokens.refresh, setInLocalStorage )
  store.commit( 'auth/setTokens', tokens )
  store.commit( 'auth/setIsAuth', true )
}
