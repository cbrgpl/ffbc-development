<template >
  <div :class="['flex items-stretch justify-center select-none relative', paginationDisabledClasses]" >

    <div
      v-if="loading"
      class="absolute right-2/4 bottom-2/4 transform translate-x-2/4 translate-y-2/4" >
      <div class="relative w-12 h-12" >
        <zLoader size="48px" ></zLoader>
      </div>
    </div>

    <button
      class="pagination-surface pagination-item"
      @click="changePageByDirection(-1)" >
      <zIconBase
        class="transform rotate-180"
        width="26px"
        icon="doubleArrow" />
    </button>

    <div class="flex mx-4" >
      <span
        v-for="pageNum of getPages"
        :key="pageNum"
        @click="emitSetPage(pageNum)"
        :class="['pagination-surface pagination-item mr-2.5 last:mr-0', getPageNumberClasses(pageNum)]" >
        {{ pageNum }}
      </span>
    </div>

    <button
      class="pagination-surface pagination-item"
      @click="changePageByDirection(1)" >
      <zIconBase
        width="26px"
        icon="doubleArrow" />
    </button>
  </div>
</template>

<script>
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
      distanceToEdge: 1,
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
        'pagination-item_active': nodePage === this.currentPage
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.pagination-surface {
  @apply bg-black-lighten border border-black border-solid rounded-md hover:bg-black-lightest;
}

.pagination-item {
  @apply flex justify-center items-center cursor-pointer px-2.5 py-2;

  min-width: rem(44px);
}

.pagination-item_active {
  @apply text-primary-lightest pointer-events-none;
}

.pagination_loading {
  .pagination-surface {
    @apply text-black-lightest cursor-default pointer-events-none;
  }
}

</style>
