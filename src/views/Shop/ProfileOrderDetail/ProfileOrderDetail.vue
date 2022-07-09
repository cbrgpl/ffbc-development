<template >
  <div
    v-if="loader"
    class="w-full h-full" >
    <zLoader
      size="200px"
      background
      title />
  </div>
  <div
    v-else
    class="shop-main-padding flex-col" >
    <header class="flex justify-between items-center flex-wrap" >
      <h4 class="font-mono mr-5 leading-tight" >
        № {{ order.data.id }}
      </h4>
      <zOrderStatus :status-value="order.data.orderStatus" />
    </header>

    <zDivider class="my-3" />

    <Section title="Order products:" >
      <OrderProducts />
    </Section>

    <zDivider class="my-3" />

    <Section
      title="Order summary:" >
      <OrderSummary />
    </Section>

    <zDivider class="my-3" />

    <Section >
      <OrdererDetails />
    </Section>
  </div>
</template>

<script >
import zOrderStatus from '@shop_components/atomic/zOrderStatus.vue'

import Section from './partial/Section.vue'
import OrderProducts from './partial/OrderProducts.vue'
import OrderSummary from './partial/OrderSummary.vue'
import OrdererDetails from './partial/OrdererDetails.vue'

import { computed } from 'vue'

export default {
  name: 'ProfileOrderDetail',
  components: {
    zOrderStatus,
    Section,
    OrderProducts,
    OrderSummary,
    OrdererDetails
  },
  provide () {
    return {
      orderData: computed( () => this.order.data ),
      orderProducts: computed( () => this.order.products ),
      orderMeasures: computed( () => this.order.data.measures || [] )
    }
  },
  props: {
    orderId: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      order: {
        data: {},
        products: [],
      },
      loader: true
    }
  },
  computed: {
    orderProductIds () {
      const productIds = []
      for ( const orderItem of this.order.data.orderItems ) {
        if ( orderItem.product && !productIds.includes( orderItem.product ) ) {
          productIds.push( orderItem.product )
        }
      }

      return productIds
    },
  },
  created () {
    this.fetchOrder()
  },
  methods: {
    async fetchOrder () {
      const order = await this.$store.dispatch( 'order/outFetchOrderById', this.orderId )
      this.order.data = order
      this.loader = false
      this.fetchOrderProducts()
    },
    async fetchOrderProducts () {
      await this.$store.dispatch( 'cart/addProductsByIds', this.orderProductIds )

      const productBuffer = this.$store.getters[ 'cart/productBuffer' ]
      this.order.products = productBuffer.filter( ( product ) => this.orderProductIds.includes( product.id ) )
    },

  }

}
</script>

<style lang="scss" scoped >
.information-field {
  @apply font-mono;
}
</style>
