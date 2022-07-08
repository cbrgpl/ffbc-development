<template >
  <div
    v-tooltip.top="featureIconData.name"
    class="h-8 w-8 inline-block bg-black-primary p-1.5 rounded-full border border-solid border-primary-lightest select-none" >
    <img
      class="w-full h-full"
      width="1"
      height="1"
      :src="featureIconData.icon" >
  </div>
</template>

<script >
export default {
  name: 'ZFeatureIcon',
  props: {
    featureIconData: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped >

</style>
