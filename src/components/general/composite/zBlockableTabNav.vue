<template >
  <zTabNav
    :tabs="tabs"
    :keyword-getter="keywordGetter"
    :model-value="keyword"
    @update:modelValue="changeTab" >
    <template v-slot="{tab, active}" >
      <slot
        :tab="tab"
        :active="active"
        :passed="isTabPassed(tab)" >
        {{ tab }}
      </slot>
    </template>
  </zTabNav>
</template>

<script>
import { ref } from 'vue'

import zTabNav from '@general_components/atomic/zTabNav.vue'

export default {
  name: 'zBlockableTabNav',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
    blocks: {
      type: Array,
      required: true,
    },
    keywordGetter: {
      type: Function,
      required: true,
    },
  },
  data () {
    return {
      passedTabMap: [],
    }
  },
  watch: {
    modelValue () {
      const passedTabIndex = this.modelValue === this.blockStart ? this.blockStart : this.modelValue - 1

      this.passedTabMap[ passedTabIndex ].passed = true
      this.makeTabsUnpassed( this.modelValue )
    },
    activeBlock ( newBlock, oldBlock ) {
      this.disableBlockTabs( oldBlock )
      this.enableBlockTabs( newBlock )
    }
  },
  created () {
    this.initPassedTabMap()
  },
  computed: {
    keyword () {
      return this.tabs[ this.modelValue ].keyword
    },
    activeBlock () {
      return this.blocks.find( ( block ) => block[ 0 ] <= this.modelValue && this.modelValue <= block[ 1 ] )
    },
    blockStart () {
      return this.activeBlock[ 0 ]
    },
    blockEnd () {
      return this.activeBlock[ 1 ]
    }
  },
  methods: {
    initPassedTabMap () {
      const passedTabMap = []

      for ( let i = 0; i < this.tabs.length; ++i ) {
        const tab = this.tabs[ i ]

        const tabKeyword = this.keywordGetter( tab )
        const tabInActiveBlock = this.blockStart <= i && i <= this.blockEnd
        const passed = tabInActiveBlock ? false : null

        passedTabMap.push( {
          keyword: tabKeyword,
          passed: ref( passed ),
        } )
      }

      this.passedTabMap = passedTabMap
    },
    isTabPassed ( tab ) {
      const keyword = this.keywordGetter( tab )

      const tabMapItem = this.passedTabMap.find( ( mapItem ) => {
        return mapItem.keyword === keyword
      } )

      return tabMapItem.passed
    },
    makeTabsUnpassed () {
      for ( let i = this.modelValue; i <= this.blockEnd; ++i ) {
        const tabActive = this.passedTabMap[ i ] !== null

        this.passedTabMap[ i ].passed = tabActive ? false : null
      }
    },
    changeTab ( keyword ) {
      const indexOfTab = this.tabs.findIndex( ( tab ) => this.keywordGetter( tab ) === keyword )

      if ( this.blockStart <= indexOfTab && indexOfTab < this.modelValue ) {
        this.$emit( 'update:modelValue', indexOfTab )
      }
    },
    disableBlockTabs ( block ) {
      for ( let i = block[ 0 ]; i <= block[ 1 ]; ++i ) {
        this.passedTabMap[ i ].passed = null
      }
    },
    enableBlockTabs ( block ) {
      for ( let i = block[ 0 ]; i <= block[ 1 ]; ++i ) {
        this.passedTabMap[ i ].passed = false
      }
    }
  },
  components: {
    zTabNav
  }
}
</script>

<style lang="scss">

</style>
