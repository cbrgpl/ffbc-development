<template >
  <zTape
    v-bind="$attrs"
    scrollable >
    <zMediaWithTitle
      v-for="product of orderProducts.value"
      :key="product.id"
      @click="showProductDetail(product)"
      class="h-36 whitespace-normal flex-shrink-0 mr-4 last:mr-0"
      :src="product.media[0].display"
      :title="product.title"
      disable-media-overlay />
  </zTape>
  <ProductDialog
    v-if="productDialog.visible"
    v-model:visible="productDialog.visible"
    :product="productDialog.product" />
</template>

<script>
import ProductDialog from './ProductDialog.vue'

export default {
  name: 'OrderProducts',
  inheritAttrs: false,
  inject: [ 'orderData', 'orderProducts' ],
  data () {
    return {
      productDialog: {
        visible: false,
        product: null,
      }
    }
  },
  methods: {
    showProductDetail ( product ) {
      this.productDialog.visible = true
      this.productDialog.product = product
    },
    hideProductDetail () {
      this.productDialog.visibile = false
      this.productDialog.product = null
    }
  },
  components: {
    ProductDialog,

  }
}
</script>

<style lang="scss" scoped>

</style>
