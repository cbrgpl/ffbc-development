export default class StrategyContext {
  constructor ( strategy ) {
    this.strategy = strategy
  }

  setStrategy ( strategy ) {
    this.strategy = strategy
  }

  executeStrategy () {
    return this.strategy()
  }
}
