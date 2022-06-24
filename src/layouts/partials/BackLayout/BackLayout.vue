<template >
  <div class="flex flex-col" >
    <div
      @click="routerPushBack"
      class="flex items-center w-full py-3 bg-black-primary text-xl select-none" >
      <zIconBase
        class="w-6 mr-2"
        icon="backArrow" />
      Back
    </div>

    <div :class="contentWrapperClasses" >
      <slot />
    </div>
  </div>
</template>

<script>
import preventLayoutExtendMixin from '@/helpers/mixins/preventLayoutExtend.mixin'

export default {
  name: 'user-layout',
  mixins: [ preventLayoutExtendMixin ],
  methods: {
    routerPushBack () {
      this.$router.push( { name: 'ShopTmp' } )
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
