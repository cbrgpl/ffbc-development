<template >
  <zTape
    :scrollable="true"
    class="sticky top-0 inline-flex md:hidden items-center w-full h-16 bg-black-primary border-b border-solid border-white border-opacity-60 px-2" >
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
        :icon="option.iconName" />
      {{ option.text }} </router-link>
  </zTape>
</template>

<script>
import homeNavigation from '@enums/nav/homeNavigation.options.js'
import zTape from '@components/atomic/zTape.vue'

export default {
  name: 'TheMobileTape',
  data () {
    return {
      homeNavigation
    }
  },
  components: {
    zTape
  }
}
</script>

<style>

</style>
