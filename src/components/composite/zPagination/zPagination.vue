<template >
  <div class="flex items-center select-none" >
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
        v-for="pageNum of getPages "
        :key="pageNum"
        :class="['pagination-surface w-7 mr-2.5 last:mr-0 p-3' ,getPageNumberClasses(pageNum)]" >
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
  emits: [ 'change-page' ],
  props: {
    page: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
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
        return this.getArrayOfPages( 1, 5 )
      } else if ( this.scenario === this.scenarios.middle ) {
        const min = this.page - this.distanceToEdge
        const max = this.page + this.distanceToEdge

        return this.getArrayOfPages( min, max )
      } else {
        const min = this.totalPages - this.displayPageQnt + 1

        return this.getArrayOfPages( min, this.totalPages )
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

      this.$emit( 'change-page', direction )
    },
    checkEmergencyCase ( direction ) {
      if ( direction === -1 && this.page === 1 ) {
        return false
      } else if ( direction === 1 && this.page === this.totalPages ) {
        return false
      }

      return true
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
.pagination-surface {
  @apply bg-black-lighten border border-black border-solid rounded-md;
}
</style>
