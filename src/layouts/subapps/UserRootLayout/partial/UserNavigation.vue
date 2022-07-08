<template >
  <div class="flex text-xl md:text-2xl" >
    <zTabRouteNavigation
      class="w-full md:w-auto"
      :tabs="userNavigation" />
  </div>
</template>

<script >
import zTabRouteNavigation from '@general_components/composite/zTabRouteNavigation.vue'

export default {
  name: 'UserNavigation',
  components: {
    zTabRouteNavigation
  },
  data () {
    return {
      userNavigation: [],
    }
  }
}
</script>
<style lang="scss" >

</style>
