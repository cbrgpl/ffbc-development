<template >
  <div class="relative" >
    <!-- <zLoader
      v-if="loading"
      class="bg-opacity-60 z-10 w-full h-full"
      size="160px"
      background
      title /> -->

    <div
      ref="contentContainer"
      class="h-full w-full overflow-auto" >
      <zPaginationPage
        ref="paginationPage"
        class="flex flex-col min-h-full container shop-main_padding mx-auto"
        @setPage="loadNewPage"
        :item-count="totalProducts"
        :per-page="2" >
        <div class="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 2xl:grid-cols-4 items-stretch mb-6" >
          <zProductCard
            v-observable="i"
            :key="product.title"
            v-for="(product, i) of products"
            :product="product"
            :intersected="$options.reactiveObserver.schema[i]" />
        </div>
      </zPaginationPage>
    </div>
  </div>

</template>

<script>
import zPaginationPage from '@/components/general/composite/zPaginationPage.vue'
import zProductCard from '@shop_components/composite/zProductCard.vue'

import { ReactiveObserver } from '@/helpers/modules/reactiveObserver'
import productSectionFilters from '@enums/info/productSectionFilters'

const reactiveObserver = new ReactiveObserver()

export default {
  name: 'ProductCatalog',
  reactiveObserver,
  props: {
    sectionCode: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      products: [],
      totalProducts: null,
    }
  },
  watch: {
    sectionCode () {
      this.redirectOnWrongSectionName()
    },
    products: {
      handler () {
        this.$options.reactiveObserver.observe()
      },
      flush: 'post'
    }
  },
  computed: {
    defaultSectionCode () {
      return productSectionFilters.keys().next().value
    },
    sectionFilters () {
      return productSectionFilters.get( this.sectionCode )
    },
  },
  created () {
    // TODO Переделать в гуард
    this.redirectOnWrongSectionName()
  },
  mounted () {
    this.initReactiveObserver()
  },
  beforeUnmount () {
    this.$options.reactiveObserver.unobserve()
  },
  methods: {
    initReactiveObserver () {
      const $contentContainer = this.$refs.contentContainer

      this.$options.reactiveObserver.init( $contentContainer, '0px 0px 150px 0px' )
    },
    redirectOnWrongSectionName () {
      if ( !productSectionFilters.has( this.sectionCode ) ) {
        this.$router.push( { name: 'ShopProductCatalog', params: { sectionCode: this.defaultSectionCode } } )
      }
    },
    async loadNewPage ( page, perPage ) {
      this.$refs.paginationPage.setLoadingState( true )

      const response = await this.getProducts( page, perPage )
      if ( !response.success ) {
        this.toast$.warn( { summary: 'Was not found', detail: `The page with number ${ page } is not exists` } )
        this.$refs.paginationPage.setFirstPage()
        return
      }

      this.$options.reactiveObserver.unobserve()
      this.$refs.paginationPage.scrollToTop()

      const data = response.data
      this.products = data.products
      this.totalProducts = data.count

      this.$refs.paginationPage.setLoadingState( false )
    },
    async getProducts ( page, perPage ) {
      const requestQueryParams = {
        ...this.sectionFilters,
        page,
        perPage
      }

      const dispatchResult = await this.$store.dispatch( 'product/outGetProducts', requestQueryParams )
      return dispatchResult
    },

  },
  directives: {
    observable: reactiveObserver.directive
  },
  components: {
    zProductCard,
    zPaginationPage,
  }
}
</script>

<style lang="scss" scoped>

</style>
