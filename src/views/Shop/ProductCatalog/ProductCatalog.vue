<template >
  <div class="relative" >
    <zLoader
      v-if="loading"
      class="bg-opacity-60 z-10 w-full h-full"
      size="160px"
      background
      title />

    <div class="h-full w-full overflow-auto" >
      <div class="flex flex-col min-h-full container shop-main_padding mx-auto" >
        <div class="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 2xl:grid-cols-4 items-stretch mb-auto" >
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
          <zShopProductCard
            v-for="product of products"
            :key="product.title"
            :product="product" />
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
import zShopProductCard from '@components/composite/zShopProductCard.vue'

import { defineAsyncComponent } from 'vue'

import productSectionFilters from '@enums/info/productSectionFilters'

export default {
  name: 'ProductCatalog',
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
    }
  },
  beforeUnmount () {
    this.setPageInStorage( this.pagination.page )
  },
  computed: {
    defaultSectionCode () {
      return productSectionFilters.keys().next().value
    },
    sectionFilters () {
      return productSectionFilters.get( this.sectionCode )
    },
  },
  async created () {
    this.redirectOnWrongSectionName()

    this.setPageNumber()
    this.setPage( this.pagination.page )
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
  components: {
    zShopProductCard,
    zPagination: defineAsyncComponent( () => import( '@/components/composite/zPagination/zPagination.vue' ) )
  }
}
</script>

<style>

</style>
