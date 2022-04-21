<template >
  <div class="flex text-xl md:text-2xl" >
    <zTabRouteNavigation
      class="w-full md:w-auto"
      :tabs="userNavigation" />
  </div>
</template>

<script>
import zTabRouteNavigation from '@/components/composite/zTabRouteNavigation.vue'
import userNavigation from '@enums/nav/userNavigation'

export default {
  name: 'userNavigation',
  data () {
    return {
      userNavigation,
    }
  },
  components: {
    zTabRouteNavigation
  }
}
</script>
<style lang="scss">

</style>
