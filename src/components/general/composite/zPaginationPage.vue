<template >
  <div class="flex flex-col w-full h-max min-h-full" >
    <div class="mb-auto" >
      <slot />
    </div>

    <zPagination
      :current-page="page"
      :total-pages="totalPages"
      :loading="loading"
      @setPage="emitSetPage" />
  </div>
</template>

<script >
import zPagination from '@general_components/composite/zPagination.vue'
import DomHandler from '@classes/DomHandler.class'

export default {
  name: 'ZPaginationPage',
  components: {
    zPagination
  },
  props: {
    itemCount: {
      type: [ Number, null ],
      default: null
    },
    perPage: {
      type: Number,
      default: 24,
    },
  },
  emits: [ 'setPage' ],
  expose: [ 'setLoadingState', 'setFirstPage', 'scrollToTop' ],
  data () {
    return {
      page: null,
      loading: false,
    }
  },
  computed: {
    totalPages () {
      const itemCountWasPassed = this.itemCount !== null
      return itemCountWasPassed ? Math.ceil( this.itemCount / this.perPage ) : 1
    }
  },
  created () {
    this.setStartPage()
  },
  mounted () {
    this.emitSetPage( this.page )
  },
  methods: {
    // public
    setLoadingState ( state ) {
      this.loading = state
    },
    setFirstPage () {
      this.emitSetPage( 1 )
    },
    scrollToTop () {
      const scrollableParent = DomHandler.getScrollableParents( this.$el )[ 0 ]
      if ( scrollableParent ) {
        scrollableParent.scrollTo( 0, 0 )
      }
    },
    // private
    setStartPage () {
      const hash = location.hash
      const numberMatch = hash.match( /\d+/ )
      const startPage = numberMatch !== null ? parseInt( numberMatch[ 0 ] ) : 1
      this.page = startPage
    },
    emitSetPage ( currentPage ) {
      this.page = currentPage

      this.setLocationHash( currentPage )

      this.$emit( 'setPage', currentPage, this.perPage )
    },
    setLocationHash ( currentPage ) {
      location.hash = '#' + currentPage
    },

  }
}
</script>

<style lang="scss" scoped >

</style>
