<template >
  <zDialogNonLayoutWrapper
    class="product-dialog__window w-screen max-w-md"
    position="bottom" >

    <template #title >
      <h4 class="font-semibold " >
        {{ product.title }}
      </h4>
    </template>

    <div class="flex" >
      <zMedia
        @click="goToProductDetails"
        class="mr-3 flex-grow"
        :src="mediaSrc" />
      <div class="flex flex-col w-2/4 flex-shrink-0" >
        <h5 ><strong >{{ priceString }}</strong></h5>
        <div >
          <span
            v-for="feature of product.features"
            :key="feature.feature" >
            <em > {{ feature.feature }} </em>:&nbsp;{{ feature.value }},
          </span>
        </div>
      </div>
    </div>
  </zDialogNonLayoutWrapper>
</template>

<script>
export default {
  name: 'ProductDialog',
  props: {
    product: {
      type: [ Object, null ],
      required: true,
    },
  },
  computed: {
    priceString () {
      return '$' + this.product.price
    },
    mediaSrc () {
      return this.product.media[ 0 ].display
    }
  },
  methods: {
    goToProductDetails () {
      this.$router.push( { name: 'ShopProductPage', params: { productId: this.product.id } } )
    }
  }
}
</script>

<style lang="scss">
.product-dialog__window {
  @apply px-4 py-2;
}
</style>
