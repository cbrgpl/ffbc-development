<template >
  <section class="px-3 py-4" >
    <Navigation
      class="mb-4 max-w-md md:max-w-lg mx-auto"
      v-model="currentSectionIndex"
      :checkout-navigation="checkoutNavigation" />

    <component
      class="container mx-auto"
      @section-complete="sendSectionData"
      :binded-cart-items="bindedCartItems"
      :is="sectionName" >

      <template #actions >
        <zButton >
          change
        </zButton>
      </template>
    </component>

  </section>
</template>

<script>
import { computed } from 'vue'
import checkoutNavigation from '@enums/info/navigation.checkout.js'

import Navigation from './partial/Navigation.vue'

import BasicInformation from './partial/BasicInformation.vue'
import Measures from './partial/Measures.vue'

import CheckoutStrategyEntry from '@classes/checkoutStrategyEntry'
import CheckoutStrategyFinish from '@classes/checkoutStrategyFinish'

import { orderService } from '@services'
import { NetworkAttemptError } from '@/helpers/errors'

const strategiesMap = new Map( [
  [ 'BasicInformation', {
    constructorArgs: [ 'orderCreate' ],
    Strategy: CheckoutStrategyEntry
  } ],
  [ 'Measures', {
    constructorArgs: [ 'orderMeasuresCreate' ],
    Strategy: CheckoutStrategyFinish
  } ],
] )

export default {
  name: 'Checkout',
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
      strategiesMap,
      activeStrategy: null,
      orderId: null,
      actionsLoader: false
    }
  },
  provide () {
    return {
      actionsDisabled: computed( () => this.currentSectionIndex === this.checkoutNavigation.tabs.length - 1 ),
      actionsLoader: computed( () => this.actionsLoader )
    }
  },
  watch: {
    orderId ( newOrderId ) {
      if ( newOrderId ) {
        this.createOrderItems()
      }
    }
  },
  computed: {
    sectionKeyword () {
      return this.checkoutNavigation.tabs[ this.currentSectionIndex ].keyword
    },
    sectionName () {
      return this.sectionKeyword.slice( 0, 1 ).toUpperCase() + this.sectionKeyword.slice( 1 )
    },
    bindedCartItems () {
      return this.$store.getters[ 'cart/bindedCartItems' ].filter( ( bindedCartItem ) => this.bindedCartItemIds.includes( bindedCartItem.cartItem.id ) )
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
  methods: {
    async sendSectionData ( data ) {
      this.actionsLoader = true
      this.setStrategy( data.sectionName )

      const unbindedPayload = JSON.parse( JSON.stringify( data.payload ) )

      const orderId = await this.activeStrategy.sendData( unbindedPayload, this.ids )
      this.setOrderId( orderId )

      this.changeSection()
      this.actionsLoader = false
    },
    setOrderId ( orderId ) {
      if ( this.orderId === null ) {
        this.orderId = orderId
      }
    },
    changeSection () {
      if ( this.currentSectionIndex < this.checkoutNavigation.tabs.length - 1 ) {
        this.currentSectionIndex++
      }
    },
    setStrategy ( sectionName ) {
      const { constructorArgs, Strategy } = this.strategiesMap.get( sectionName )

      this.activeStrategy = new Strategy( constructorArgs )
    },
    async createOrderItems () {
      const createOrderItems = await orderService.orderItemsCreate( this.orderItems )

      if ( createOrderItems.httpResponse.status !== 201 ) {
        throw new NetworkAttemptError( createOrderItems.httpResponse )
      }
    }
  },
  components: {
    Navigation,

    BasicInformation,
    Measures
  }
}
</script>
