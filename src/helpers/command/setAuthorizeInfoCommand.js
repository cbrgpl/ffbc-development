import StoreCommand from './base_commands/storeCommand'

class SetAuthorizeInfoCommand extends StoreCommand {
  execute () {
    this.store.commit( 'auth/setIsAuth', true )
    this.store.commit( 'auth/setTokens', this.data )
  }
}

export default SetAuthorizeInfoCommand
