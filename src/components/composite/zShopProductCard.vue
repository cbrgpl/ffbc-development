<template >
  <div class="flex flex-col bg-black-lighten border-placeholder border-opacity-75 border-solid border rounded-md overflow-hidden" >

    <zShopProductSlider
      class="h-72 md:h-96"
      :media="product.media" />

    <div
      @click="routeToProductPage"
      class="flex flex-col flex-grow px-3 pt-1.5 pb-4 cursor-pointer" >
      <h4 class="text-sm leading-4 sm:text-lg font-medium sm:leading-6 mb-4" >
        {{ product.title }}
      </h4>

      <div class="mt-auto select-none" >
        <div class="flex flex-col lg:flex-row lg:items-end justify-between" >

          <div class="flex flex-col sm:flex-row lg:flex-col justify-between mb-1.5 lg:mb-0" >
            <div
              v-if="containsInStock"
              class="mb-2 text-sm sm:text-base lg:mb-1" >
              Quantity in stock - {{ product.stockQnt }}
            </div>
            <span class="text-sm sm:text-base text-placeholder font-mono font-semibold underline mb-2 lg:mb-0" >
              ${{ product.price }}
            </span>
          </div>

          <zIconButton
            @click.stop="addToCard"
            class="w-full py-1.5 sm:py-3 lg:w-auto lg:py-1.5 lg:px-3"
            variant="safety"
            icon="cart"
            icon-title="Add To Cart"
            :icon-size="20" >
          </zIconButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zShopProductSlider from '@components/composite/zShopProductSlider/zShopProductSlider.vue'

export default {
  name: 'ShopProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    containsInStock () {
      return this.product.stockQnt !== 0
    }
  },
  methods: {
    addToCard () {
      this.dialog$.show( 'addToCart', { product: this.product } )
    },
    routeToProductPage () {
      this.$router.push( {
        name: 'ShopProductPage',
        params: {
          productId: this.product.id,
        },
      } )
    },
  },
  components: {
    zShopProductSlider,
  }
}
</script>

<style lang="scss" scoped>

</style>
