import { setRefreshInStorage, isLocalStorageUsed } from '@functions'

export default function updateTokensInStorages ( store, tokens ) {
  const setInLocalStorage = isLocalStorageUsed()
  setRefreshInStorage( tokens.refresh, setInLocalStorage )
  store.commit( 'auth/setAuthorizeInfo', tokens )
}
