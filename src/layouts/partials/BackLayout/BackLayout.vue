<template >
  <div class="flex flex-col" >
    <div
      class="flex items-center w-full py-3 bg-black-primary text-xl select-none"
      @click="routerPushBack" >
      <zIconBase
        class="w-6 mr-2"
        icon="backArrow" />
      Back
    </div>

    <div
      :class="contentWrapperClasses"
      class="flex flex-col" >
      <slot />
    </div>
  </div>
</template>

<script >
import preventLayoutExtendMixin from '@/helpers/mixins/preventLayoutExtend.mixin'

export default {
  name: 'UserLayout',
  mixins: [ preventLayoutExtendMixin ],
  methods: {
    routerPushBack () {
      this.$router.push( { name: 'ShopTmp' } )
    }
  },
}
</script>

<style lang="scss" scoped >
</style>
