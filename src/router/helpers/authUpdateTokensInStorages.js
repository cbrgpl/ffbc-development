import { setRefreshInStorage, isLocalStorageUsed } from '@functions'
import { SetAuthorizeInfoCommand } from '@commands'

export default function updateTokensInStorages ( store, tokens ) {
  const setInLocalStorage = isLocalStorageUsed()
  setRefreshInStorage( tokens.refresh, setInLocalStorage )

  const setAuthorizeInfoCommand = new SetAuthorizeInfoCommand( store, { tokens } )
  setAuthorizeInfoCommand.execute()
}
