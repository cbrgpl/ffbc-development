<template >
  <div class="flex items-center justify-between w-full bg-black-lighten py-2 px-1.5 md:px-3 border-b border-white border-solid" >
    <div
      class="p-1 xl:hidden"
      @click="$emit( 'toggleSidebarVisibility' )" >
      <zIconBase
        class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        icon-name="menu" />
    </div>
    <router-link
      class="hidden xl:block"
      :to="{name: 'ShopMain'}" >
      <img
        width="60"
        height="auto"
        :src="require('@images/shop/logo.jpg')" >
    </router-link>

    <div v-if="isAuth" >
      <zIconBase
        class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        icon-name="cart" />
    </div>

    <zIconButton
      v-else
      @click="showAuthDialog"
      class="h-full md:h-auto py-2 px-1.5"
      shrink
      icon-name="login"
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
    } )
  },
  methods: {
    showAuthDialog () {
      this.dialog$.show( 'auth' )
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
