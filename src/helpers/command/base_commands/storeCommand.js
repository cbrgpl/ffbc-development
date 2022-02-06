import Command from './command'
export default class StoreCommand extends Command {
  constructor ( store, data ) {
    super()

    this.store = store
    this.data = data
  }
}
