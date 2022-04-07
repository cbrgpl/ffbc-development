<template >
  <div
    class="flex flex-col overflow-x-hidden" >
    <TheHeader
      v-if="!hidden['TheHeader']"
      @toggleSidebar="isSidebarVisible = !isSidebarVisible"
      class="flex-shrink-0" />
    <teleport to="body" >
      <TheSidebar
        v-if="!hidden['TheSidebar']"
        v-model:isSidebarVisible="isSidebarVisible"
        :sidebar-visible-mobile="isSidebarVisible"
        class="flex flex-col flex-shrink-0 relative lg:fixed left-0 h-full z-20" />
    </teleport>
    <div class="flex flex-grow flex-col lg:flex-row overflow-hidden max-w-full"  >
      <TheStaticSidebar
        v-if="!hidden['TheStaticSidebar']"
        class="hidden lg:flex" />
      <TheStaticSidebarMobile
        v-if="!hidden['TheStaticSidebarMobile']"
        class="lg:hidden order-2" />
      <div
        class="h-full w-full overflow-y-auto border-t border-white border-solid border-opacity-25 order-1 lg:order-none" >
        <router-view class="w-full h-full" />
      </div>
    </div>
  </div>
</template>

<script>
import TheSidebar from './partial/TheSidebar/TheSidebar.vue'
import TheStaticSidebar from './partial/TheStaticSidebar/TheStaticSidebar.vue'
import TheStaticSidebarMobile from './partial/TheStaticSidebarMobile/TheStaticSidebarMobile.vue'
import TheHeader from './partial/TheHeader.vue'

import { baseLayoutMix, escCloseMix } from '@mixins'

export default {
  name: 'main-layout',
  mixins: [ baseLayoutMix, escCloseMix ],
  data () {
    return {
      isSidebarVisible: false,
    }
  },
  methods: {
    closeFn () {
      this.isSidebarVisible = false
    }
  },
  components: {
    TheSidebar,
    TheStaticSidebar,
    TheStaticSidebarMobile,
    TheHeader,
  },
}
</script>

<style lang="scss" scoped>

</style>
