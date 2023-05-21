import { orderService } from '@services'

export default class CheckoutStrategy {
  constructor ( serviceMethodName ) {
    this.orderService = orderService
    this.serviceMethodName = serviceMethodName
  }

  sendData ( payload ) {
    if( this.serviceMethodName ) {
      return this.orderService[ this.serviceMethodName ]( payload )
    }
  }
}
