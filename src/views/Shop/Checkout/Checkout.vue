<template >
  <section class="px-3 py-4 flex flex-col flex-grow" >
    <Navigation
      v-model="currentSectionIndex"
      class="mb-4 max-w-md md:max-w-lg mx-auto w-full"
      :checkout-navigation="checkoutNavigation" />

    <component
      :is="sectionName"
      class="container mx-auto flex-grow"
      :user-id="ids.userId"
      :order-id="orderId"
      :binded-cart-items="bindedCartItems"
      @sectionComplete="sendSectionData" >
      <template #actions >
        <zButton >
          change
        </zButton>
      </template>
    </component>
  </section>
</template>

<script >
import { computed } from 'vue'
import checkoutNavigation from '@enums/nav/tabs.shopCheckout.js'

import Navigation from './partial/Navigation.vue'

import BasicInformation from './partial/BasicInformation.vue'
import Measures from './partial/Measures.vue'
import PaypalPayment from './partial/PaypalPayment.vue'

import CheckoutStrategyWithHooks from '@classes/checkoutStrategyWithHooks'

import { orderService } from '@services'
import { NetworkAttemptError } from '@/helpers/errors'

export default {
  name: 'Checkout',
  components: {
    Navigation,

    BasicInformation,
    Measures,
    PaypalPayment
  },
  provide () {
    return {
      actionsDisabled: computed( () => this.currentSectionIndex === this.checkoutNavigation.tabs.length - 1 ),
      actionsLoader: computed( () => this.actionsLoader ),
      orderId: computed( () => this.orderId )
    }
  },
  props: {
    bindedCartItemIds: {
      type: Array,
      required: true,
    }
  },
  data () {
    return {
      checkoutNavigation,
      currentSectionIndex: 0,
      strategiesMap: [],
      activeStrategy: null,
      orderId: null,
      actionsLoader: false,
      bindedCartItems: [],
    }
  },
  computed: {
    sectionKeyword () {
      return this.checkoutNavigation.tabs[ this.currentSectionIndex ].keyword
    },
    sectionName () {
      return this.sectionKeyword.slice( 0, 1 ).toUpperCase() + this.sectionKeyword.slice( 1 )
    },
    orderItems () {
      const getOrderItemTemplate = () => ( {
        order: null,
        product: null,
        featureFields: null,
      } )

      return this.bindedCartItems.map( ( bindedCartItem ) => {
        const orderItem = getOrderItemTemplate()

        orderItem.order = this.orderId
        orderItem.product = bindedCartItem.cartItem.product
        orderItem.featureFields = bindedCartItem.cartItem.featureFields

        return orderItem
      } )
    },
    ids () {
      const userId = this.$store.getters[ 'user/id' ] || null
      const orderId = this.orderId

      return {
        userId,
        orderId
      }
    }
  },
  async created () {
    this.initStrategies()

    this.bindedCartItems = ( await this.$store.dispatch( 'cart/outBindedCartItems' ) )
      .filter( ( bindedCartItem ) => this.bindedCartItemIds.includes( bindedCartItem.cartItem.id ) )
  },
  methods: {
    initStrategies () {
      const strategiesSchema = [
        [
          'BasicInformation',
          new CheckoutStrategyWithHooks( {
            beforeRequest: this.mixUserIdAtInit,
            afterRequest: this.handleOrderInit
          }, 'orderCreate' )
        ],
        [
          'Measures',
          new CheckoutStrategyWithHooks( {}, 'orderMeasuresCreate' )
        ],
        [
          'PaypalPayment',
          new CheckoutStrategyWithHooks( { afterRequest: this.finishOrderCheckout } )
        ],
      ]

      this.strategiesMap = new Map( strategiesSchema )
    },
    async sendSectionData ( data ) {
      this.actionsLoader = true
      this.setStrategy( data.sectionName )

      const unbindedPayload =data.payload ? JSON.parse( JSON.stringify( data.payload ) ) : null
      await this.activeStrategy.sendData( unbindedPayload )

      this.changeSection()
      this.actionsLoader = false
    },
    changeSection () {
      if ( this.currentSectionIndex < this.checkoutNavigation.tabs.length - 1 ) {
        this.currentSectionIndex++
      }
    },
    setStrategy ( sectionName ) {
      this.activeStrategy = this.strategiesMap.get( sectionName )
    },
    handleOrderInit ( orderCreateResponse ) {
      this.setOrderId( orderCreateResponse.parsedBody.id )
      this.createOrderItems()
    },
    setOrderId ( orderId ) {
      if ( this.orderId === null ) {
        this.orderId = orderId
      }
    },
    async createOrderItems ( ) {
      const createOrderItems = await orderService.orderItemsCreate( this.orderItems )

      if ( createOrderItems.httpResponse.status !== 201 ) {
        throw new NetworkAttemptError( createOrderItems.httpResponse )
      }
    },
    mixUserIdAtInit ( payload ) {
      payload.user = this.ids.userId
      return [ payload ]
    },
    finishOrderCheckout ( response ) {
      this.$router.push( { name: 'ShopTmp' } )
      this.$store.dispatch( 'cart/removeCartItems', this.bindedCartItemIds )
    },
  }
}
</script>
