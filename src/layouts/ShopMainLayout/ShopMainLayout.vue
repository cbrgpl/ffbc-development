<template >
  <div
    class="flex flex-col items-stretch overflow-x-hidden" >
    <TheHeader
      @toggle-sidebar-visibility="toggleSidebarVisibility"
      v-if="!hidden['TheHeader']" />
    <div class="relative flex flex-grow items-stretch lg:flex-row overflow-hidden w-full"  >
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

import { baseLayoutMix, subAppLayoutMix, escCloseMix } from '@mixins'

export default {
  name: 'shop-main-layout',
  mixins: [ baseLayoutMix, subAppLayoutMix, escCloseMix ],
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
