<template >
  <div class="flex items-center justify-between h-16 md:h-20 w-full bg-black-primary pr-3 sm:pr-8 pl-3 py-2.5" >
    <div class="flex items-center h-full" >
      <div class="w-10 h-10 sm:h-12 sm:w-12 p-1 mr-4" >
        <zIconBase
          @click="$emit('toggleSidebar')"
          class="text-white cursor-pointer flex-shrink-0"
          width="100%"
          height="100%"

          icon-name="menu" />
      </div>
      <router-link
        class="h-full"
        :to="{name: 'Main'}" >
        <img
          class="header__logo"
          height="150"
          width="250"
          :src="require( '@images/logo.png' )"
          alt="" >
      </router-link>
    </div>

    <!-- <div  > -->
    <router-link
      v-if="isAuth && $route.name !== 'HomeMain'"
      :to="{name: 'HomeMain'}" >
      <img
        class="header__avatar"
        width="32"
        height="32"
        :src="avatar"
        alt="" >
    </router-link>
    <!-- </div> -->

    <div
      v-else-if="!isAuth"
      class="flex" >
      <zIconButton
        shrink
        @click="dialog$.show('login')"
        class="py-2 px-2 sm:px-3 md:py-2.5 text-sm uppercase font-semibold mr-2"
        :icon-size="20"
        icon-name="login" >
        Log In
      </zIconButton>
      <zIconButton
        shrink
        @click="dialog$.show('registration')"
        variant="ghost"
        class="py-2 px-2 sm:px-3 md:py-2.5 text-sm uppercase font-semibold"
        :icon-size="20"
        icon-name="signUp" >
        Sign up
      </zIconButton>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data ( ) {
    return {
      avatar: require( '@images/avatar.jpg' )
    }
  },
  computed: {
    ...mapGetters( {
      isAuth: 'auth/isAuth'
    } )
  }
}
</script>

<style lang="scss" scoped>
.header__logo {
  @apply w-auto h-full cursor-pointer;
  aspect-ratio: 5 / 3;
}

.header__avatar {
  @apply w-12 h-12 md:w-16 md:h-16 border-2 border-solid border-white rounded-full cursor-pointer;
}
</style>
