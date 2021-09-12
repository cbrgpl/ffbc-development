<template >
  <div
    ref="tape"
    class="sticky top-0 flex md:hidden items-center w-full h-14 bg-black-primary border-b border-solid border-white overflow-x-auto border-opacity-60 px-2" >
    <router-link
      active-class="text-black"
      class="flex items-center bg-primary-darkest rounded-md whitespace-nowrap py-2.5 px-4 mr-1.5"
      v-for="option in homeNavigation"
      :key="option.routeName"
      :to="{name: option.routeName}" >
      <zIconBase
        :width="24"
        :height="24"
        class="mr-1"
        :icon-name="option.iconName" />
      {{ option.text }} </router-link>
  </div>
</template>

<script>
import homeNavigation from '@enums/nav/homeNavigation.options.js'

export default {
  name: 'TheMobileLenta',
  data () {
    return {
      homeNavigation
    }
  },
}
</script>

<style>

</style>
