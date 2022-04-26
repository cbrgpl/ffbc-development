import CheckoutStrategy from './checkoutStrategy'

export default class CheckoutStrategyEntry extends CheckoutStrategy {
  async sendData ( payload, ids ) {
    const userId = ids.userId
    const data = { ...payload, user: userId }

    const createOrder = await this.orderService.orderCreate( data )

    return createOrder.parsedBody.id
  }
}
