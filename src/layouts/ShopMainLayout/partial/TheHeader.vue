<template >
  <div class="flex items-center justify-between w-full bg-black-lighten py-2 px-1.5 md:px-3 border-b border-primary-darkest border-solid" >
    <div
      class="p-1 xl:hidden"
      @click="emitSidebarShowing" >
      <zIconBase
        class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        icon="menu" />
    </div>
    <router-link
      class="hidden xl:block"
      :to="{name: 'ShopMain'}" >
      <img
        width="60"
        height="auto"
        :src="require('@images/shop/logo.jpg')" >
    </router-link>

    <div
      class="flex items-center"
      v-if="isAuth" >
      <div
        v-if="!isProfileNavigationInvisible"
        class="flex pr-3 border-r border-placeholder border-opacity-70 border-solid mr-3" >
        <router-link
          active-class="text-primary-darken text-opacity-80"
          class="w-12 h-12 p-2.5 mr-1.5 cursor-pointer hover:bg-black-lightest hover:bg-opacity-40 transition-colors rounded-full md:w-12 md:h-12"
          :to="{name: 'ShopProfileOrderList'}" >
          <zIconBase
            icon="inventory" />
        </router-link>

        <router-link
          active-class="text-primary-darken text-opacity-80"
          class="w-12 h-12 p-2.5 cursor-pointer hover:bg-black-lightest hover:bg-opacity-40 transition-colors rounded-full md:w-12 md:h-12"
          :to="{name: 'ShopProfileCart'}" >
          <zIconBase
            icon="cart" />
        </router-link>
      </div>

      <router-link
        :to="{name: 'ShopProfile'}"
        class="h-12 w-12 flex p-1 border-2 border-white border-solid rounded-full bg-black" >
        <zIconBase
          class="m-auto"
          icon="user" />
      </router-link>
    </div>

    <zIconButton
      v-else
      @click="showAuthDialog"
      class="h-full md:h-auto py-2 px-1.5"
      shrink
      icon="login"
      unshrink-breakpoint="sm" >
      Sign In
    </zIconButton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheHeader',
  emits: [ 'toggleSidebarVisibility' ],
  computed: {
    ...mapGetters( {
      isAuth: 'auth/isAuth'
    } ),
    isProfileNavigationInvisible () {
      const lgBreakpointMinWidth = 1024
      return this.$route.matched.some( ( match ) => match.name === 'ShopProfile' ) && document.body.clientWidth >= lgBreakpointMinWidth
    }
  },
  methods: {
    showAuthDialog () {
      this.dialog$.show( 'auth' )
    },
    emitSidebarShowing () {
      this.$emit( 'toggleSidebarVisibility', null )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
