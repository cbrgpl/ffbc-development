<template >
  <aside class="h-full flex flex-col pt-4  border-r border-l border-placeholder border-opacity-60 border-solid bg-black-lighten" >

    <router-link
      v-for="navigationElement in profileNavigation"
      :key="navigationElement.toRouteName"
      :to="{ name: navigationElement.toRouteName }"
      v-tooltip.top.5="navigationElement.title"
      active-class="text-primary text-opacity-75"
      class="flex items-center transition-colors delay-75 mb-6" >

      <span class="w-10 h-10" >
        <zIconBase
          :icon="navigationElement.iconName" />
      </span>
    </router-link>

  </aside>
</template>

<script>
import profileNavigation from '@enums/nav/router.shopProfile'

export default {
  name: 'TheSideMenu',
  data () {
    return {
      profileNavigation
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
