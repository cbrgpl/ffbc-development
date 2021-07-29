<template >
  <div
    class="flex flex-col overflow-x-hidden" >
    <TheHeader
      @toggleSidebar="isSidebarVisible = !isSidebarVisible"
      class="flex-shrink-0" />
    <teleport to="body" >
      <TheSidebar
        v-model:isSidebarVisible="isSidebarVisible"
        :sidebar-visible-mobile="isSidebarVisible"
        class="flex flex-col flex-shrink-0 relative lg:fixed left-0 h-full z-20" />
    </teleport>
    <div class="flex flex-grow overflow-hidden max-w-full"  >
      <TheStaticSidebar class="hidden lg:flex" />
      <div
        class="h-full w-full overflow-y-auto border-t border-white border-solid border-opacity-25" >
        <router-view class="px-3" />
      </div>
    </div>
  </div>
</template>

<script>
import TheSidebar from './partial/TheSidebar/TheSidebar.vue'
import TheStaticSidebar from './partial/TheStaticSidebar/TheStaticSidebar.vue'
import TheHeader from './partial/TheHeader.vue'

export default {
  name: 'main-layout',
  data () {
    return {
      isSidebarVisible: false,
    }
  },
  components: {
    TheSidebar,
    TheStaticSidebar,
    TheHeader,
  },
}
</script>

<style lang="scss" scoped>

</style>
