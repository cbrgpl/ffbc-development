<template >
  <div class="flex flex-col bg-black-lighten border-placeholder border-opacity-75 border-solid border rounded-md overflow-hidden" >

    <zShopProductSlider :media-srcs="product.media" ></zShopProductSlider>

    <div
      @click="routeToProductPage(product)"
      class="flex flex-col flex-grow px-3 pt-1.5 pb-4 cursor-pointer" >
      <h4 class="text-lg font-medium leading-6 mb-4" >
        {{ product.title }}
      </h4>

      <div class="mt-auto select-none" >
        <div class="flex flex-col lg:flex-row lg:items-end justify-between" >

          <div class="flex lg:flex-col justify-between mb-1.5 lg:mb-0" >
            <div
              v-if="containsInStock"
              class="mb-2 lg:mb-1 order-3 lg:order-1" >
              Quantity in stock - {{ product.count }}
            </div>
            <span class="text-placeholder font-mono font-semibold underline mb-2 lg:mb-0 order-2" >
              ${{ product.price }}
            </span>
          </div>

          <zIconButton
            @click.stop="addToCard"
            class="z-button--safety w-full py-3 lg:w-auto lg:py-1.5 lg:px-3"
            icon-name="cart"
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
      return this.product.count !== 0
    }
  },
  methods: {
    addToCard () {
      console.log( 'adds to card' )
    },
    routeToProductPage ( product ) {
      this.$router.push( {
        name: 'ShopProductPage',
        params: {
          productId: 1,
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
