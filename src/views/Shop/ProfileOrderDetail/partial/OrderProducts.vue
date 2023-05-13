<template >
  <zTape
    v-bind="$attrs"
    scrollable >
    <zMediaWithTitle
      v-for="bindedOrderItem of bindedOrderItems"
      :key="bindedOrderItem.orderItem.id"
      class="h-36 whitespace-normal flex-shrink-0 mr-4 last:mr-0"
      :original="getProductMedia(bindedOrderItem)"
      :title="getProductTitle(bindedOrderItem)"
      disable-overlay
      @click="showProductDetail(bindedOrderItem)" />
  </zTape>
  <ProductDialog
    v-if="productDialog.visible"
    v-model:visible="productDialog.visible"
    :binded-order-item="productDialog.bindedOrderItem" />
</template>

<script >
import ProductDialog from './ProductDialog.vue'

export default {
  name: 'OrderProducts',
  components: {
    ProductDialog,
  },
  inject: [ 'orderData', 'orderProducts' ],
  inheritAttrs: false,
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

      if ( this.orderData.orderItems ) {
        for ( const orderItem of this.orderData.orderItems ) {
          const bindedOrderItem = {
            orderItem,
            product: null
          }

          bindedOrderItem.product = this.orderProducts.find( ( product ) => product.id === orderItem.product ) || null

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
  }
}
</script>

<style lang="scss" scoped >

</style>
