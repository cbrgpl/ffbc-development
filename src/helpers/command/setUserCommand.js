import StoreCommand from './base_commands/storeCommand'

class SetUserCommand extends StoreCommand {
  execute () {
    this.store.commit( 'user/setUserData', this.data.getUser.parsedBody )
  }
}

export default SetUserCommand
