<template >
  <g >
    <path
      d="M0 0h24v24H0z"
      fill="none" /><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </g>

</template>

<script>
export default {
  name: 'IconHome',
  beforeMount () {
    this.$emit( 'icon-before-mount', '0 0 24 24' )
  },
}
</script>

<style lang="scss" scoped>

</style>
