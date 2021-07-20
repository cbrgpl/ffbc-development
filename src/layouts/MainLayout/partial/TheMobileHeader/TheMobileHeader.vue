<template >
  <div class="flex lg:hidden items-center h-14 w-full top-0 bg-black-lighten border-b border-solid border-primary-darkest z-40" >
    <zIconBase
      @click="$emit('toggleMobileMenu')"
      class="text-white cursor-pointer p-1"
      width="46"
      height="46"

      icon-name="menu" />
  </div>
</template>

<script>
import zIconBase from '@components/composite/zIconBase.vue'

export default {

  components: {
    zIconBase,
  }
}
</script>

<style lang="scss" scoped>

</style>
