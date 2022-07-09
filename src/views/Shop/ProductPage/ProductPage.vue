<template >
  <div
    class="flex flex-col w-full h-full container m-auto relative" >
    <div
      v-if="loading"
      class="flex bg-black w-full h-full left-0 top-0 absolute z-50" >
      <div class="w-36 h-36 m-auto relative" >
        <zLoader title ></zLoader>
      </div>
    </div>
    <div
      v-if="product !== null"
      class="flex flex-col lg:flex-row lg:h-full shop-main-padding" >
      <zProductSlider
        class="w-full lg:w-2/5 flex-shrink-0 h-96 lg:h-full"
        :media="product.media" />

      <div
        class="flex flex-col px-1.5 pt-3 sm:px-3 lg:w-full lg:p-0 lg:ml-3" >
        <div class="mb-4 md:mb-6 lg:mb-8" >
          <zTabsNav
            v-model="inPageNavigation.activeTab"
            :tabs="inPageNavigation.tabs" />
        </div>
        <h2 class="mb-3" >
          {{ product.title }}
        </h2>

        <component
          :is="activeTabName"
          v-bind="product"
          :features="productFeatures"
          :type="productType"
          @showAddToCart="showAddToCart" />
      </div>
    </div>
  </div>
</template>

<script >
import zProductSlider from '@shop_components/composite/zProductSlider.vue'

import AvailableFeatures from './partial/AvailableFeatures.vue'
import Description from './partial/Description.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'ProductPage',
  components: {
    zProductSlider,
    AvailableFeatures,
    Description,
  },
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      product: null,
      loading: false,
      inPageNavigation: {
        tabs: [
          'Description',
          'Available Features',
        ],
        activeTab: 'Description'
      }

    }
  },
  computed: {
    ...mapGetters( {
      getProductType: 'product/productType',
      getProductFeatures: 'product/productFeatures'
    } ),
    productType () {
      return this.getProductType( this.product )
    },
    productFeatures () {
      return this.getProductFeatures( this.productType )
    },
    activeTabName () {
      return this.inPageNavigation.activeTab.replace( ' ', '' )
    }
  },
  created () {
    this.fetchProduct()
  },
  methods: {
    async fetchProduct () {
      this.loading = true
      const product = await this.$store.dispatch( 'product/outFetchProductById', this.productId )
      this.product = product
      this.loading = false
    },
    showAddToCart () {
      this.dialog$.show( 'addToCart', { product: this.product } )
    }
  },
}
</script>

<style lang="scss" scoped >

</style>
