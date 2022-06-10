<template >
  <zTape
    v-bind="$attrs"
    scrollable >
    <zMediaWithTitle
      v-for="bindedOrderItem of bindedOrderItems"
      :key="bindedOrderItem.orderItem.id"
      @click="showProductDetail(bindedOrderItem)"
      class="h-36 whitespace-normal flex-shrink-0 mr-4 last:mr-0"
      :original="getProductMedia(bindedOrderItem)"
      :title="getProductTitle(bindedOrderItem)"
      disable-overlay />
  </zTape>
  <ProductDialog
    v-if="productDialog.visible"
    v-model:visible="productDialog.visible"
    :binded-order-item="productDialog.bindedOrderItem" />
</template>

<script>
import ProductDialog from './ProductDialog.vue'
import { TEMPLATE_IMG } from 'consts'

export default {
  name: 'OrderProducts',
  inheritAttrs: false,
  inject: [ 'orderData', 'orderProducts' ],
  data () {
    return {
      productDialog: {
        visible: false,
        bindedOrderItem: null,
      },
      TEMPLATE_IMG
    }
  },
  computed: {
    bindedOrderItems () {
      const bindedOrderItems = []

      if ( this.orderData.value.orderItems ) {
        for ( const orderItem of this.orderData.value.orderItems ) {
          const bindedOrderItem = {
            orderItem,
            product: null
          }

          bindedOrderItem.product = this.orderProducts.value.find( ( product ) => product.id === orderItem.product ) || null

          bindedOrderItems.push( bindedOrderItem )
        }
      }

      return bindedOrderItems
    },
  },
  methods: {
    getProductMedia ( bindedOrderItem ) {
      return bindedOrderItem.product !== null ? bindedOrderItem.product.media[ 0 ].display : this.TEMPLATE_IMG
    },
    getProductTitle ( bindedOrderItem ) {
      return bindedOrderItem.product !== null ? bindedOrderItem.product.title : 'Product was deleted'
    },
    showProductDetail ( bindedOrderItem ) {
      this.productDialog.visible = true
      this.productDialog.bindedOrderItem = bindedOrderItem
    },
    hideProductDetail () {
      this.productDialog.visibile = false
      this.productDialog.bindedOrderItem = null
    }
  },
  components: {
    ProductDialog,
  }
}
</script>

<style lang="scss" scoped>

</style>
