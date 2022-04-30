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
      const orderRequest = await new Promise( ( resolve, reject ) => {
        resolve( {
          httpResponse: {
            status: 200
          },
          parsedBody: {
            id: 1,
            additionalPhotos: [],
            orderItems: [
              {
                id: 1,
                price: '202.00',
                order: 1,
                product: 1,
                featureFields: [
                  1
                ]
              }
            ],
            measures: [
              {
                id: 1,
                value: 'test',
                order: 1,
                measureField: 1
              }
            ],
            contactServices: [
              {
                id: 1,
                value: 'zoom_val',
                contactService: 2,
                order: 1
              }
            ],
            firstName: 'Dmitry',
            lastName: 'Log',
            email: 'cybirgpl@gmail.com',
            street: 'Bluhera',
            city: 'Novosibirsk',
            country: 'Russia',
            state: 'Novosibirsk State',
            zipCode: '693080',
            phoneNumber: '+79230040520',
            instagramUrl: 'https://instagram.com/cbrgpl',
            birthDate: '2022-03-08',
            height: 190,
            competitionDescription: 'Super competition!!',
            bustType: 1,
            contacts: 'dima',
            orderedDate: '2022-03-08T17:19:36.116860Z',
            paymentDate: null,
            orderStatus: 1,
            weight: 90,
            fullSizePhoto: null,
            backPosePhoto: null,
            sidePosePhoto: null,
            user: 1
          }
        } )
      } )

      if ( orderRequest.httpResponse.status !== 200 ) {
        throw new NetworkAttemptError( orderRequest.httpResponse )
      }

      return orderRequest.parsedBody
    }
  }
}
