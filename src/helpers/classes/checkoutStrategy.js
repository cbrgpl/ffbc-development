import { orderService } from '@services'

export default class CheckoutStrategy {
  constructor ( serviceMethodName ) {
    this.orderService = orderService
    this.serviceMethodName = serviceMethodName
  }

  async sendData ( payload, ids = { userId: null, orderId: null } ) {
    return await new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        console.log( payload )
        resolve()
      }, 4500 )
    } )
  }
}
