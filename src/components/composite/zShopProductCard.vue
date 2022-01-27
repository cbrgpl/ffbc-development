<template >
  <div class="flex flex-col bg-black-lighten border-placeholder border-opacity-75 border-solid border rounded-md overflow-hidden" >
    <zShopProductSlider
      @newActiveElementNumber="setProductMediaShownByIndex( $event )"
      :elements-count="mediaCount"
      class="w-full h-36 m-auto border-b border-placeholder border-solid" >
      <div
        v-for="(mediaSrc, i) of productData.media"
        :key="mediaSrc"
        class="bg-black-lightest h-full w-full flex-shrink-0" >
        <zMedia
          class="h-full"
          @click="showInMediaOverlay(mediaSrc)"
          :original-src="mediaSrc"
          :blur-src="require('@images/shop/blur-template.png')"
          :load-original="originalMediaVisibilityArray[i]"
          media-type="image" />
      </div>
    </zShopProductSlider>

    <div
      @click="routeToProductPage"
      class="flex flex-col flex-grow px-3 pt-1.5 pb-4 cursor-pointer" >
      <h4 class="text-lg font-medium leading-6 mb-4" >
        {{ productData.title }}
      </h4>

      <div class="mt-auto select-none" >
        <div class="flex flex-col lg:flex-row lg:items-end justify-between" >

          <div class="flex lg:flex-col justify-between mb-1.5 lg:mb-0" >
            <div
              v-if="containsInStock"
              class="mb-2 lg:mb-1 order-3 lg:order-1" >
              Quantity in stock - {{ productData.count }}
            </div>
            <span class="text-placeholder font-mono font-semibold underline mb-2 lg:mb-0 order-2" >
              ${{ productData.price }}
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
    productData: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      originalMediaVisibilityArray: null

    }
  },
  created () {
    this.initOriginalMediaVisibilityArray()
  },
  computed: {
    mediaCount () {
      return this.productData.media.length
    },
    containsInStock () {
      return this.productData.count !== 0
    }
  },
  methods: {
    initOriginalMediaVisibilityArray () {
      this.originalMediaVisibilityArray = ( new Array( this.mediaCount ) ).fill( false )
    },
    addToCard () {
      console.log( 'adds to card' )
    },
    routeToProductPage () {
      console.log( 'route to product page' )
    },
    showInMediaOverlay ( mediaSrc ) {
      this.mediaViewOverlay$.show( mediaSrc )
    },
    setProductMediaShownByIndex ( mediaIndex ) {
      this.originalMediaVisibilityArray[ mediaIndex ] = true
    },

  },
  components: {
    zShopProductSlider,
  }
}
</script>

<style lang="scss" scoped>

</style>
