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
      class="flex flex-col lg:flex-row lg:h-full lg:px-4 pb-2 md:py-3"
      v-if="product !== null" >
      <zShopProductSlider
        class="w-full h-96 lg:h-full flex-shrink-0 lg:w-2/5"
        :media="product.media" />

      <div
        class="flex flex-col px-1.5 pt-3 sm:px-3 lg:w-full lg:p-0 lg:ml-3" >
        <div class="mb-4 md:mb-6 lg:mb-8" >
          <zTabsNav
            :tabs="inPageNavigation.tabs"
            v-model="inPageNavigation.activeTab" />
        </div>

        <h2 class="mb-3" >
          {{ product.title }}
        </h2>

        <component
          :is="activeTabName"
          v-bind="product"
          :features="productFeatures"
          :type="productType" />
      </div>

    </div>
  </div>
</template>

<script>
import zShopProductSlider from '@components/composite/zShopProductSlider/zShopProductSlider.vue'

import AvailableFeatures from './partial/AvailableFeatures.vue'
import Description from './partial/Description.vue'
import Stock from './partial/Stock.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'ProductPage',
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
          'Stock'
        ],
        activeTab: 'Available Features'
      }

    }
  },
  created () {
    this.fetchProduct()
  },
  computed: {
    ...mapGetters( {
      productTypeGetter: 'product/productTypeById',
      productFeaturesByIds: 'product/productFeaturesByIds'
    } ),
    productType () {
      return this.productTypeGetter( this.product.type )
    },
    productFeatures () {
      const featureIdArray = this.productType.productFeatures
      return this.productFeaturesByIds( featureIdArray )
    },
    activeTabName () {
      return this.inPageNavigation.activeTab.replace( ' ', '' )
    }
  },
  methods: {
    async fetchProduct () {
      this.loading = true
      const product = await this.$store.dispatch( 'product/outFetchProductById', this.productId )
      console.log( product )
      this.product = product
      this.loading = false
    }
  },
  components: {
    zShopProductSlider,
    AvailableFeatures,
    Description,
    Stock,
  }
}
</script>

<style lang="scss" scoped>

</style>
