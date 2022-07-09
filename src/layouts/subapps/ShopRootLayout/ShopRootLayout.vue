<template >
  <div
    class="flex-col" >
    <TheHeader
      v-if="partialVisible('TheHeader')"
      @toggleSidebarVisibility="toggleSidebarVisibility" />

    <div class="layout-content-wrapper relative items-stretch" >
      <TheSidemenu
        v-if="partialVisible('TheSidemenu')"
        :visible="sidebarVisiblity"
        @changeSidebarVisibility="setSidebarVibility" />

      <router-view
        id="shop-root-content"
        class="layout-content" />
    </div>
  </div>
</template>

<script >
import TheHeader from './partial/TheHeader.vue'
import TheSidemenu from './partial/TheSidemenu.vue'

import { hidePartialsMixin, rootLayoutMixin, escCloseMix } from '@mixins'

export default {
  name: 'ShopRootLayout',
  components: {
    TheHeader,
    TheSidemenu
  },
  mixins: [ hidePartialsMixin, rootLayoutMixin, escCloseMix ],
  data () {
    return {
      sidebarVisiblity: false,
    }
  },
  computed: {
    currentRoute () {
      return this.$route
    },
    isAuth () {
      return this.$store.getters[ 'auth/isAuth' ]
    }
  },
  watch: {
    currentRoute () {
      this.setSidebarVibility( false )
    },
    isAuth ( isAuth, oldValue ) {
      this.$store.dispatch( 'cart/setCartStrategy', isAuth )

      if ( isAuth && oldValue === false ) {
        this.$store.dispatch( 'cart/mergeLocalAndApiCarts' )
      } else if ( !isAuth && oldValue === true ) {
        this.$store.commit( 'cart/clearModule' )
      }
    },
  },
  methods: {
    toggleSidebarVisibility () {
      this.sidebarVisiblity = !this.sidebarVisiblity
    },
    setSidebarVibility ( visibilityState ) {
      this.sidebarVisiblity = visibilityState
    },
  },
}
</script>

<style lang="scss" scoped >
</style>
