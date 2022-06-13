<template >
  <div :class="['flex items-center justify-center select-none relative', paginationDisabledClasses]" >

    <div
      v-if="loading"
      class="absolute right-2/4 bottom-2/4 transform translate-x-2/4 translate-y-2/4" >
      <div class="relative w-12 h-12" >
        <zLoader size="48px" ></zLoader>
      </div>
    </div>

    <PaginationButton
      class="pagination-surface"
      @click="changePageByDirection(-1)" >
      <zIconBase
        class="transform rotate-180"
        width="26px"
        icon="doubleArrow" />
      Prev
    </PaginationButton>

    <div class="mx-4" >
      <span
        v-for="pageNum of getPages"
        :key="pageNum"
        @click="emitSetPage(pageNum)"
        :class="['pagination-surface cursor-pointer w-7 mr-2.5 last:mr-0 p-3', getPageNumberClasses(pageNum)]" >
        {{ pageNum }}
      </span>
    </div>

    <PaginationButton
      class="pagination-surface"
      @click="changePageByDirection(1)" >
      Next
      <zIconBase
        width="26px"
        icon="doubleArrow" />
    </PaginationButton>
  </div>
</template>

<script>
import PaginationButton from './partial/PaginationButton.vue'

export default {
  name: 'zPagination',
  emits: [ 'setPage' ],
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    }
  },
  data () {
    return {
      displayPageQnt: 5,
      startOfMiddle: 3,
      distanceToEdge: 2,
      scenarios: {
        aboutStart: -1,
        middle: 0,
        aboutEnd: 1
      }
    }
  },
  computed: {
    endOfMiddle () {
      return this.totalPages - 2
    },
    scenario () {
      if ( this.currentPage < this.startOfMiddle ) {
        return this.scenarios.aboutStart
      } else if ( this.startOfMiddle <= this.currentPage && this.currentPage <= this.endOfMiddle ) {
        return this.scenarios.middle
      } else {
        return this.scenarios.aboutEnd
      }
    },
    getPages () {
      if ( this.scenario === this.scenarios.aboutStart ) {
        const displayMax = this.totalPages > this.displayPageQnt ? this.displayPageQnt : this.totalPages

        return this.getArrayOfPages( 1, displayMax )
      } else if ( this.scenario === this.scenarios.middle ) {
        const min = this.currentPage - this.distanceToEdge
        const max = this.currentPage + this.distanceToEdge

        return this.getArrayOfPages( min, max )
      } else {
        let min = this.totalPages - this.displayPageQnt + 1

        if ( min < 1 ) {
          min = 1
        }

        return this.getArrayOfPages( min, this.totalPages )
      }
    },
    paginationDisabledClasses () {
      return {
        pagination_loading: this.loading
      }
    }
  },
  methods: {
    getArrayOfPages ( min, max ) {
      const array = []

      for ( let i = min; i <= max; ++i ) {
        array.push( i )
      }

      return array
    },
    changePageByDirection ( direction ) {
      if ( !this.checkEmergencyCase( direction ) ) {
        return
      }

      const newPage = this.currentPage + direction
      this.emitSetPage( newPage )
    },
    checkEmergencyCase ( direction ) {
      if ( direction === -1 && this.currentPage === 1 ) {
        return false
      } else if ( direction === 1 && this.currentPage === this.totalPages ) {
        return false
      }

      return true
    },
    emitSetPage ( page ) {
      this.$emit( 'setPage', page )
    },
    getPageNumberClasses ( nodePage ) {
      return {
        'text-primary': nodePage === this.currentPage
      }
    }
  },

  components: {
    PaginationButton
  }
}
</script>

<style lang="scss" scoped>
.pagination-surface {
  @apply bg-black-lighten border border-black border-solid rounded-md;
}

.pagination_loading {
  .pagination-surface {
    @apply text-black-lightest cursor-default pointer-events-none;
  }
}

</style>
