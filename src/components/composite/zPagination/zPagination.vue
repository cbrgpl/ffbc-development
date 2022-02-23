<template >
  <div :class="['flex items-center select-none', paginationDisabledClasses]" >
    <PaginationButton
      class="pagination-surface"
      @click="emitChangePage(-1)" >
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
      @click="emitChangePage(1)" >
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
  emits: [ 'change-page', 'set-page' ],
  props: {
    page: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    itemCount: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    totalPages () {
      return Math.ceil( this.itemCount / this.perPage )
    },
    endOfMiddle () {
      return this.totalPages - 2
    },
    scenario () {
      if ( this.page < this.startOfMiddle ) {
        return this.scenarios.aboutStart
      } else if ( this.startOfMiddle <= this.page && this.page <= this.endOfMiddle ) {
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
        const min = this.page - this.distanceToEdge
        const max = this.page + this.distanceToEdge

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
        pagination_disabled: this.disabled
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
    emitChangePage ( direction ) {
      if ( !this.checkEmergencyCase( direction ) ) {
        return
      }

      this.emitEvent( 'change-page', direction )
    },
    checkEmergencyCase ( direction ) {
      if ( direction === -1 && this.page === 1 ) {
        return false
      } else if ( direction === 1 && this.page === this.totalPages ) {
        return false
      }

      return true
    },
    emitSetPage ( pageNum ) {
      this.emitEvent( 'set-page', pageNum )
    },
    emitEvent ( eventName, ...params ) {
      if ( !this.disabled ) {
        this.$emit( eventName, ...params )
      }
    },
    getPageNumberClasses ( nodePage ) {
      return {
        'text-primary': nodePage === this.page
      }
    }
  },

  components: {
    PaginationButton
  }
}
</script>

<style lang="scss" scoped>
.pagination_disabled {
  .pagination-surface {
    @apply text-black-lightest cursor-default;
  }
}

.pagination-surface {
  @apply bg-black-lighten border border-black border-solid rounded-md;
}
</style>
