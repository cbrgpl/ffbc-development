<template >
  <div class="flex items-center justify-between h-16 md:h-20 w-full bg-black-lighten pr-3 sm:pr-8 pl-3 py-2.5" >
    <div class="flex items-center h-full" >
      <div class="w-10 h-10 sm:h-12 sm:w-12 p-1 mr-4" >
        <zIconBase
          @click="$emit('toggleSidebar')"
          class="text-white cursor-pointer flex-shrink-0"
          width="100%"
          height="100%"

          icon-name="menu" />
      </div>
      <img
        class="header__logo"
        height="150"
        width="250"
        :src="require( '@images/logo.png' )"
        alt="" >
    </div>

    <div class="flex" >
      <zButtonIcon
        shrink
        @click="dialog$.show('login')"
        class="py-2 px-2 sm:px-3 md:py-2.5 text-sm uppercase font-semibold mr-2"
        :icon-size="20"
        icon-name="login" >
        Log In
      </zButtonIcon>
      <zButtonIcon
        shrink
        @click="dialog$.show('registration')"
        variant="ghost"
        class="py-2 px-2 sm:px-3 md:py-2.5 text-sm uppercase font-semibold"
        :icon-size="20"
        icon-name="signUp" >
        Sign up
      </zButtonIcon>

    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>

.header__logo {
  aspect-ratio: 5 / 3;

  @apply w-auto h-full cursor-pointer;
}
</style>
