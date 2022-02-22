<template >
  <div class="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 2xl:grid-cols-4 xl:gap-x- items-stretch px-3" >
    <zShopProductCard
      v-for="product of products"
      :key="product.title"
      :product="product" />
  </div>

  <zPagination
    class="mt-4 mx-auto"
    @change-page="changePage"
    @set-page="setPage"
    v-bind="pagination" />
</template>

<script>
import zShopProductCard from '@components/composite/zShopProductCard.vue'

import { defineAsyncComponent } from 'vue'

import filtersForProductSection from '@enums/info/filtersForProductSection'

export default {
  name: 'ProductCatalog',
  props: {
    productType: {
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
        totalPages: null,
      },
      loading: true,
    }
  },
  watch: {
    productType ( newV ) {
      this.pagination.page = 1
      this.getProducts( this.pagination.page )
    }
  },
  beforeUnmount () {
    this.setPageInStorage( this.pagination.page )
  },
  computed: {
    sectionFilters () {
      return filtersForProductSection.find( ( sectionFilters ) => sectionFilters.section === this.productType ).filters
    },
    filters () {
      const filters = {}

      for ( const filter of this.sectionFilters ) {
        filters[ filter.name ] = filter.value
      }

      return filters
    }
  },
  async created () {
    this.setPageNumber()
    this.setPage( this.pagination.page )
  },
  methods: {
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
      return Number( pageNum )
    },

    async changePage ( direction ) {
      const newPage = this.pagination.page + direction

      await this.setPage( newPage )
    },
    async setPage ( pageNumber ) {
      const productsResponse = await this.getProducts( pageNumber )

      this.pagination.totalPages = productsResponse.count
      this.pagination.page = pageNumber

      this.products = productsResponse.products
    },
    async getProducts ( page ) {
      const requestQueryParams = {
        ...this.filters,
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
