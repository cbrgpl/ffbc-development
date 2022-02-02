<template >
  <div class="w-full h-full" >
    <TheBackBar
      class="lg:hidden"
      v-if="!hiddenLayoutElemets.includes('TheBackBar')"
      @goBack="$router.go(-1)"
      :page-name="getPageName" />

    <div class="flex h-full" >
      <TheSideMenu
        class="hidden lg:flex" />
      <router-view ></router-view>
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
