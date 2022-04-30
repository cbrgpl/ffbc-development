import { orderService } from '@services'
import { NetworkAttemptError } from '@errors'

export default {
  namespaced: true,
  state () {
    return {
      orderStatusTypes: [],
    }
  },
  getters: {
    orderStatusTypes: ( state ) => state.orderStatusTypes
  },
  mutations: {
    setOrderStatusTypes ( state, orderStatusTypes ) {
      state.orderStatusTypes = orderStatusTypes
    },
  },
  actions: {
    async fetchOrderSpecs ( { commit } ) {
      const orderSpecs = await orderService.getOrderSpecs()

      if ( orderSpecs.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( orderSpecs.httpResponse )
      }

      commit( 'setOrderStatusTypes', orderSpecs.parsedBody.orderStatusType )
    },
    async outFetchOrderList ( context, filters ) {
      const orders = await orderService.getOrders( )

      if ( orders.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( orders.httpResponse )
      }
      return orders.parsedBody.results
    },
    async outFetchOrderById ( context, orderId ) {
      const orderRequest = await orderService.getOrderDetails( null, orderId )

      if ( orderRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( orderRequest.httpResponse )
      }

      return orderRequest.parsedBody
    }
  }
}
