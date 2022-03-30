<template >
  <div
    v-if="dataLoaded"
    class="shop-main_padding flex-col flex" >
    <header class="flex justify-between items-center flex-wrap" >
      <h4 class="font-mono mr-5 leading-tight" >
        № {{ '010-5ef-9105' || order.data.id }}
      </h4>
      <zShopOrderStatus :status-id="1" />
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

    <Section  >
      <OrdererDetails />
    </Section>
  </div>
  <div
    v-else
    class="w-full h-full" >
    <zLoader
      size="200px"
      background
      title />
  </div>
</template>

<script>
import zShopOrderStatus from '@components/atomic/zShopOrderStatus.vue'

import Section from './partial/Section.vue'
import OrderProducts from './partial/OrderProducts.vue'
import OrderSummary from './partial/OrderSummary.vue'
import OrdererDetails from './partial/OrdererDetails.vue'

import fakeOrderMeasures from '@enums/fake/orderMeasures'

import { computed } from 'vue'

export default {
  name: 'ProfileOrderDetail',
  props: {
    orderId: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      order: {
        data: null,
        products: null,
      },
    }
  },
  provide () {
    return {
      orderData: computed( () => this.order.data ),
      orderProducts: computed( () => this.order.products ),
      fakeOrderMeasures
    }
  },
  created () {
    this.fetchOrder()
    this.fetchOrderProducts()
  },
  computed: {
    dataLoaded () {
      return this.order.data !== null && this.order.products !== null
    }
  },
  methods: {
    async fetchOrder () {
      const order = await this.$store.dispatch( 'order/outFetchOrderById', this.orderId )
      this.order.data = order
    },
    async fetchOrderProducts () {
      const products = await this.$store.dispatch( 'product/outFetchProductsByOrderId' )
      this.order.products = products.data.products

      for ( const product of this.order.products ) {
        product.features = [
          {
            feature: 'material',
            value: 'len'
          },
          {
            feature: 'feat2',
            value: 'vla2'
          },
          {
            feature: 'feat3',
            value: 'val3'
          },
          {
            feature: 'feat4',
            value: 'val4'
          },
          {
            feature: 'feat5',
            value: 'val5'
          }
        ]
      }
    },

  },
  components: {
    zShopOrderStatus,
    Section,
    OrderProducts,
    OrderSummary,
    OrdererDetails
  }

}
</script>

<style lang="scss" scoped>
.information-field {
  @apply font-mono;
}
</style>
