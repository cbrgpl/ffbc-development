<template >
  <zDialogNonLayoutWrapper
    class="product-dialog__window w-screen max-w-md"
    position="bottom" >
    <template #title >
      <h4 class="font-semibold " >
        {{ bindedOrderItem.product.title }}
      </h4>
    </template>

    <div class="flex" >
      <zMedia
        class="mr-3 flex-grow"
        :original="mediaSrc"
        @click="goToProductDetails" />
      <div class="flex flex-col w-2/4 flex-shrink-0" >
        <h5 ><strong >{{ priceString }}</strong></h5>
        <div >
          <span
            v-for="feature of features"
            :key="feature.feature" >
            <em > {{ feature.feature }} </em>:&nbsp;{{ feature.value }},
          </span>
        </div>
      </div>
    </div>
  </zDialogNonLayoutWrapper>
</template>

<script >
export default {
  name: 'ProductDialog',
  props: {
    bindedOrderItem: {
      type: [ Object, null ],
      required: true,
    },
  },
  computed: {
    priceString () {
      return '$' + this.bindedOrderItem.orderItem.price
    },
    mediaSrc () {
      return this.bindedOrderItem.product.media[ 0 ].display
    },
    features () {
      return this.$store.getters[ 'product/getFeaturesAndFields' ]( this.bindedOrderItem.orderItem.featureFields )
    },
  },
  methods: {
    goToProductDetails () {
      this.$router.push( { name: 'ShopProductPage', params: { productId: this.product.id } } )
    }
  }
}
</script>

<style lang="scss" >
.product-dialog__window {
  @apply px-4 py-2;
}
</style>
