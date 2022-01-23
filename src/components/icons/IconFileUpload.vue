<template >
  <g >
    <path
      d="M0 0h24v24H0z"
      fill="none" />
    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />

  </g>
</template>

<script>
export default {
  name: 'IconFileUpload',
  beforeMount () {
    this.$emit( 'icon-before-mount', '0 0 24 24' )
  },
}
</script>

<style lang="scss" scoped>

</style>
