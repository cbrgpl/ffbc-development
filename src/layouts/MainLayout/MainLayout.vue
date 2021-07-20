<template >
  <div class="flex overflow-x-hidden" >
    <TheSidebar
      v-model:sidebarMode="sidebarMode"
      :sidebar-visible-mobile="mobileMenuVisible"
      class="flex flex-col flex-shrink-0 relative lg:fixed left-0 h-full z-20" />
    <div class="lg:pl-12 overflow-hidden max-w-full flex-grow flex-shrink-0"  >
      <TheMobileHeader
        @toggleMobileMenu="mobileMenuVisible = !mobileMenuVisible"
        class="px-3" />
      <div class="h-full w-full overflow-y-auto" >
        <router-view class="px-3" />
      </div>
    </div>
  </div>
</template>

<script>
import TheSidebar from './partial/TheSidebar/TheSidebar.vue'
import TheMobileHeader from './partial/TheMobileHeader/TheMobileHeader.vue'

export default {
  name: 'main-layout',
  data () {
    return {
      sidebarMode: 'alwaysOpen',
      mobileMenuVisible: true,
    }
  },
  mounted () {
    window.addEventListener( 'resize', this.changeSidebarVariant )
  },
  beforeDestroy () {
    // TODO Проверить что все хорошо удаляется
    window.removeEventListener( this.changeSidebarVariant )
  },
  methods: {
    changeSidebarVariant ( event ) {
      const lgBreakpoint = 1024

      if ( window.innerWidth < lgBreakpoint ) {
        this.sidebarMode = 'disabled'
      } else {
        this.sidebarMode = 'alwaysCollapsed'
      }
    }
  },
  components: {
    TheSidebar,
    TheMobileHeader,
  },
}
</script>

<style lang="scss" scoped>

</style>
