<template >
  <zTape
    :scrollable="true"
    class="sticky top-0 inline-flex md:hidden items-center w-full h-16 bg-black-primary border-b border-solid border-white border-opacity-60 px-2" >
    <router-link
      v-for="option in homeNavigation"
      :key="option.routeName"
      active-class="text-black"
      class="flex items-center bg-primary-darkest rounded-md whitespace-nowrap py-2.5 px-4 mr-1.5"
      :to="{name: option.routeName}" >
      <zIconBase
        :width="24"
        :height="24"
        class="mr-1"
        :icon="option.iconName" />
      {{ option.text }}
    </router-link>
  </zTape>
</template>

<script >
import homeNavigation from '@enums/nav/router.competitionsHome.js'
import zTape from '@general_components/atomic/zTape.vue'

export default {
  name: 'TheMobileTape',
  components: {
    zTape
  },
  data () {
    return {
      homeNavigation
    }
  }
}
</script>

<style >

</style>
