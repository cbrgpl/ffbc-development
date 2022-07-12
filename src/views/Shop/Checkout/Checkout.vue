<template >
  <CheckoutContent
    ref="content"
    :binded-cart-items="bindedCartItems"
    @sectionCompleted="switchSectionCompletedAction"
    @lastSectionCompleted="finishOrderCheckout" />
</template>

<script >
import { computed } from 'vue'

import CheckoutContent from './partial/CheckoutContent.vue'

import { orderService } from '@services'
import { NetworkAttemptError } from '@/helpers/errors'

import { checkoutSections } from '@enums/nav/tabs.shopCheckout.js'


export default {
  name: 'Checkout',
  components: {
    CheckoutContent
  },
  provide () {
    return {
      orderId: computed( () => this.orderId ),
    }
  },
  props: {
    cartItemIds: {
      type: Array,
      required: true,
    }
  },
  data () {
    return {
      bindedCartItems: [],
      orderId: null,
    }
  },
  computed: {
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
    userId() {
      return this.$store.getters[ 'user/id' ]
    },
  },
  created () {
    this.setBindedCartItems()
  },
  methods: {
    async setBindedCartItems () {
      const allBindedCartItems = await this.$store.dispatch( 'cart/outBindedCartItems' )
      const buyingCartItems = this.cartItemIds

      this.bindedCartItems = allBindedCartItems.filter( ( bindedCartItem ) => buyingCartItems.includes( bindedCartItem.cartItem.id ) )
    },
    switchSectionCompletedAction( { payload, sectionKeyword } ) {
      switch( sectionKeyword ) {
      case checkoutSections.basicInformation.keyword: 
        return this.completeBasicInformation( payload )
      case checkoutSections.measures.keyword:
        return this.completeMeasures( payload )
      default: 
        throw new Error( `Unexpected sectionKeyword with value ${ sectionKeyword } have been got` )
      }
    },
    

    async completeBasicInformation( userBasicInformation ) {
      userBasicInformation.user = this.userId

      const response = await this.doRequest( () => this.createOrder( userBasicInformation ) )
      this.setOrderToCheckoutProccess( response.parsedBody )
    },
    createOrder( userBasicInformation ) {
      return orderService.orderCreate( userBasicInformation )
    },
    setOrderToCheckoutProccess ( order ) {
      this.orderId = order.id
      this.createOrderItems()
    },
    async createOrderItems ( ) {
      const createOrderItems = await orderService.orderItemsCreate( this.orderItems )

      if ( createOrderItems.httpResponse.status !== 201 ) {
        throw new NetworkAttemptError( createOrderItems.httpResponse )
      }
    },


    completeMeasures( measures ) {
      this.doRequest( () => orderService.orderMeasuresCreate( measures ) )
    },

    
    async doRequest ( requestCallback ) {
      const $content = this.$refs.content
      
      $content.setLoadingState( true )

      const response = await requestCallback()

      $content.setNextSection()
      $content.setLoadingState( false ) 
      return response
    },


    finishOrderCheckout () {
      this.$router.push( { name: 'ShopTmp' } )
      const toastDetail = this.getToastDetails( this.userId )
      this.toast$.success( { summary: `Order #${ this.orderId } created`, detail: toastDetail, life: 15000 } )
      this.$store.dispatch( 'cart/removeCartItems', this.cartItemIds )
    },
    getToastDetails () {
      const generalPart = 'Administrator soon will contact with you.<br>'
      const partByUserType = this.userId !== null ? 'You can explore details in your profile.' : 'Unfortunately, you can\'t explore order details.'

      return generalPart + partByUserType
    },
    
  }
}
</script>
