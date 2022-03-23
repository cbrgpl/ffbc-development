<template >
  <div class="w-full h-full flex flex-col flex-grow overflow-y-hidden" >
    <TheBackBar
      class="lg:hidden flex-shrink-0 px-2.5 md:px-5"
      v-if="!hiddenLayoutElemets.includes('TheBackBar')"
      @goBack="$router.go(-1)"
      :page-name="getPageName" />

    <div class="flex flex-col flex-grow overflow-y-hidden lg:flex-row" >
      <TheSideMenu
        class="hidden lg:flex px-2" />
      <router-view
        class="overflow-auto w-full h-full"
        v-slot="{Component, route}" >
        <keep-alive >
          <component
            include="ProfileCart"
            :is='Component'
            :key="route.meta.usePathKey ? route.path : undefined" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
import TheBackBar from './partial/TheBackBar.vue'
import TheSideMenu from './partial/TheSideMenu.vue'

export default {
  name: 'shop-profile-layout',
  computed: {
    getLastRouteMatchName () {
      const lastElemIndex = this.$route.matched.length - 1
      return this.$route.matched[ lastElemIndex ].name
    },
    getPageName () {
      return this.getLastRouteMatchName.replace( 'ShopProfile', '' )
    },
    hiddenLayoutElemets () {
      return this.$route.meta.hidden || []
    }
  },
  components: {
    TheBackBar,
    TheSideMenu
  }
}
</script>

<style lang="scss" scoped>

</style>
