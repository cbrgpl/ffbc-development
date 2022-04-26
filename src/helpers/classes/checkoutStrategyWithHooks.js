import CheckoutStrategy from './checkoutStrategy'

export default class CheckoutStrategyWithEndCallback extends CheckoutStrategy {
  constructor ( { beforeRequest, afterRequest }, ...params ) {
    super( ...params )

    this.beforeRequest = beforeRequest
    this.afterRequest = afterRequest
  }

  async sendData ( ...params ) {
    const sendDataArgs = this.beforeRequest ? this.beforeRequest( ...params ) : params

    const sendDataResult = await super.sendData( ...sendDataArgs )

    if ( this.afterRequest ) {
      this.afterRequest( sendDataResult )
    }
  }
}
