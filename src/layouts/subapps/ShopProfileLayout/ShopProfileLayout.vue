<template >
  <div class="w-full h-full flex-col" >
    <TheBackBar
      v-if="partialVisible('TheBackBar')"
      class="lg:hidden flex-shrink-0 px-2.5 md:px-5"
      :page-name="getPageName"
      @goBack="$router.go(-1)" />

    <div class="layout-content-wrapper" >
      <TheSideMenu
        v-if="partialVisible('TheSideMenu') && isAuth"
        class="hidden lg:flex px-2" />
      <router-view
        v-slot="{Component, route}" >
        <component
          :is="Component"
          id="shop-profile-content"
          :key="route.meta.usePathKey ? route.path : undefined"
          class="layout-content"
          include="ProfileCart" />
      </router-view>
    </div>
  </div>
</template>

<script >
import TheBackBar from './partial/TheBackBar.vue'
import TheSideMenu from './partial/TheSideMenu.vue'

import { hidePartialsMixin } from '@mixins'

export default {
  name: 'ShopProfileLayout',
  components: {
    TheBackBar,
    TheSideMenu
  },
  mixins: [ hidePartialsMixin ],
  computed: {
    getLastRouteMatchName () {
      const lastElemIndex = this.$route.matched.length - 1
      return this.$route.matched[ lastElemIndex ].name
    },
    getPageName () {
      return this.getLastRouteMatchName.replace( 'ShopProfile', '' )
    },
    isAuth ( ) {
      return this.$store.getters[ 'auth/isAuth' ]
    }
  }
}
</script>

<style lang="scss" scoped >

</style>
