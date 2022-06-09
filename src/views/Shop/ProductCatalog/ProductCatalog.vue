<template >
  <div class="relative" >
    <zLoader
      v-if="loading"
      class="bg-opacity-60 z-10 w-full h-full"
      size="160px"
      background
      title />

    <pre class="fixed text-white z-140" >
      {{ $options.reactiveObserver.observablesSchema }}
    </pre>

    <div
      ref="contentContainer"
      class="h-full w-full overflow-auto" >
      <div class="flex flex-col min-h-full container shop-main_padding mx-auto" >
        <div class="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 2xl:grid-cols-4 items-stretch mb-auto" >
          <zShopProductCard
            v-observable="i"
            v-for="(product, i) of products"
            :key="product.title"
            :product="product"
            :intersected="$options.reactiveObserver.observablesSchema[i]" />
        </div>

        <zPagination
          class="mt-4 mx-auto"
          @change-page="changePage"
          @set-page="setPage"
          :disabled="loading"
          v-bind="pagination" />
      </div>
    </div>
  </div>

</template>

<script>
import { defineAsyncComponent, nextTick } from 'vue'

import zShopProductCard from '@components/composite/zShopProductCard.vue'

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
      count: 0,
      pagination: {
        page: null,
        perPage: 24,
        itemCount: 0,
      },
      loading: true,
    }
  },
  watch: {
    sectionCode () {
      this.redirectOnWrongSectionName()

      this.pagination.page = 1
      this.setPage( 1 )
    },
    products () {
      nextTick( ( ) => {
        const reactiveObserver = this.$options.reactiveObserver
        if ( !reactiveObserver.inited ) {
          const $contentContainer = this.$refs.contentContainer
          reactiveObserver.init( $contentContainer, '0px 0px 300px 0px' )
        } else {
          reactiveObserver.reset()
        }
      } )
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
    this.redirectOnWrongSectionName()

    this.setPageNumber()
    this.setPage( this.pagination.page )
  },
  beforeUnmount () {
    this.setPageInStorage( this.pagination.page )
  },
  methods: {
    redirectOnWrongSectionName () {
      if ( !productSectionFilters.has( this.sectionCode ) ) {
        this.$router.push( { name: 'ShopProductCatalog', params: { sectionCode: this.defaultSectionCode } } )
      }
    },
    setPageInStorage ( pageNum ) {
      sessionStorage.setItem( 'section_page', pageNum )
    },
    setPageNumber () {
      const pageNumber = this.shiftPageFromStorage() || 1

      this.pagination.page = pageNumber
    },
    shiftPageFromStorage () {
      const pageNum = sessionStorage.getItem( 'section_page' )
      sessionStorage.removeItem( 'section_page' )
      return parseInt( pageNum )
    },

    async changePage ( direction ) {
      const newPage = this.pagination.page + direction

      await this.setPage( newPage )
    },
    async setPage ( pageNumber ) {
      const productsResponse = await this.getProducts( pageNumber )

      this.pagination.itemCount = productsResponse.count
      this.pagination.page = pageNumber

      this.products = productsResponse.products
    },
    async getProducts ( page ) {
      const requestQueryParams = {
        ...this.sectionFilters,
        page,
        perPage: this.pagination.perPage
      }

      this.loading = true

      const productsDispatch = await this.$store.dispatch( 'product/outGetProducts', requestQueryParams )

      this.loading = false

      return productsDispatch.data
    },

  },
  directives: {
    observable: reactiveObserver.observableDirective
  },
  components: {
    zShopProductCard,
    zPagination: defineAsyncComponent( () => import( '@/components/composite/zPagination/zPagination.vue' ) )
  }
}
</script>

<style lang="scss" scoped>

</style>
