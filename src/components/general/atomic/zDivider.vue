<template >
  <div :class="['border-solid border-white opacity-50', dividerVariantStyles]" ></div>
</template>

<script >
export default {
  name: 'ZDivider',
  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dividerVariantStyles () {
      return this.vertical ? 'border-l' : 'border-t'
    }
  },
}
</script>

<style lang="scss" scoped >

</style>
