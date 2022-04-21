<template >
  <div
    class="flex-col" >
    <TheHeader
      @toggle-sidebar-visibility="toggleSidebarVisibility"
      v-if="!hidden['TheHeader']" />
    <!-- flex flex-col flex-grow overflow-y-hidden -->
    <div class="layout-content-wrapper relative items-stretch"  >
      <TheSidemenu
        :visible="sidebarVisiblity"
        @change-sidebar-visibility="setSidebarVibility"
        v-if="!hidden['TheSidemenu']" />

      <router-view
        id="shop-root-content "
        class="layout-content" />
    </div>
  </div>
</template>

<script>
import TheHeader from './partial/TheHeader.vue'
import TheSidemenu from './partial/TheSidemenu.vue'

import { hideLayoutPartialsMixin, rootLayoutMixin, escCloseMix } from '@mixins'

export default {
  name: 'shop-root-layout',
  mixins: [ hideLayoutPartialsMixin, rootLayoutMixin, escCloseMix ],
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
    closeFn () {
      this.setSidebarVibility( false )
    }
  },
  components: {
    TheHeader,
    TheSidemenu
  },
}
</script>

<style lang="scss" scoped>
</style>
