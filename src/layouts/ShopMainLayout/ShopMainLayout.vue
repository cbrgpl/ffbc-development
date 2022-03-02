<template >
  <div
    class="flex flex-col items-stretch overflow-x-hidden" >
    <TheHeader
      @toggle-sidebar-visibility="toggleSidebarVisibility"
      v-if="!hidden['TheHeader']" />
    <div class="relative flex flex-grow items-stretch lg:flex-row overflow-hidden max-w-full"  >
      <TheSidemenu
        :visible="sidebarVisiblity"
        @change-sidebar-visibility="setSidebarVibility"
        v-if="!hidden['TheSidemenu']" />
      <router-view class="flex-grow flex flex-col overflow-y-auto" />
    </div>
  </div>
</template>

<script>
import TheHeader from './partial/TheHeader.vue'
import TheSidemenu from './partial/TheSidemenu.vue'

import { baseLayoutMix } from '@mixins'

export default {
  name: 'shop-main-layout',
  mixins: [ baseLayoutMix ],
  data () {
    return {
      sidebarVisiblity: false,
    }
  },
  created () {
    // TODO Возможно стоит сделать специальный гуард, который навешивается на входной роут
    this.$store.dispatch( 'product/fetchProductFeatures' )
    this.$store.dispatch( 'measure/fetchMeasures' )
    this.$store.dispatch( 'product/fetchProductTypes' )
  },
  computed: {
    currentRoute () {
      return this.$route
    },
  },
  watch: {
    currentRoute () {
      this.setSidebarVibility( false )
    }
  },
  methods: {
    toggleSidebarVisibility () {
      this.sidebarVisiblity = !this.sidebarVisiblity
    },
    setSidebarVibility ( visibilityState ) {
      this.sidebarVisiblity = visibilityState
    }
  },
  components: {
    TheHeader,
    TheSidemenu
  },
}
</script>

<style lang="scss" scoped>
::v-deep(.shop-main-padding) {
  @apply px-2.5 xl:px-3.5 py-4;
}
</style>
