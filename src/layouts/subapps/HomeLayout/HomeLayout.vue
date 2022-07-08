<template >
  <div class="flex flex-col md:flex-row" >
    <TheHomeSidebar v-if="!hidden['TheHomeSidebar']" />

    <div
      ref="content"
      class="relative overflow-y-auto flex-grow" >
      <TheMobileLenta
        v-if="!hidden['TheMobileLenta']"
        ref="tape"
        :class="tapeClasses" />
      <router-view ></router-view>
    </div>
  </div>
</template>

<script >
import TheHomeSidebar from './partial/TheHomeSidebar.vue'
import TheMobileLenta from './partial/TheMobileTape.vue'

import { hidePartialsMixin } from '@mixins'

export default {
  name: 'HomeLayout',
  components: {
    TheHomeSidebar,
    TheMobileLenta,
  },
  mixins: [ hidePartialsMixin ],
  data () {
    return {
      lastScrollTop: 0,
      tapeHidden: false,
    }
  },
  computed: {
    tapeClasses () {
      return [
        'transform transition-transform duration-300 z-50',
        this.tapeHidden ? '-translate-y-full' : ''
      ]
    },
  },
  mounted () {
    this.setMobileListeners()
  },
  beforeUnmount () {
    this.removeMobileListeners()
  },
  methods: {
    setMobileListeners () {
      this.$refs.content.addEventListener( 'scroll', this.contentScrollHandler )
    },
    removeMobileListeners () {
      this.$refs.content.removeEventListener( 'scroll', this.contentScrollHandler )
    },
    contentScrollHandler ( event ) {
      const vector = event.target.scrollTop - this.lastScrollTop
      this.lastScrollTop = event.target.scrollTop
      const $tapeEl = this.$refs.tape.$el

      if ( this.tapeHidden && ( vector < 0 ) ) {
        // scroll to top
        this.tapeHidden = false
      } else if ( !this.tapeHidden && ( vector > 0 ) && ( event.target.scrollTop >= $tapeEl.offsetHeight ) ) {
        // scroll to bottom
        this.tapeHidden = true
      }
    }
  }
}
</script>

<style lang="scss" scoped >

</style>
