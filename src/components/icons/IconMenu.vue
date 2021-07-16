<template >
  <g >
    <path
      d="M0 0h24v24H0V0z"
      fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />

  </g>
</template>

<script>
export default {
  name: 'IconMenu',
  beforeMount () {
    this.$emit( 'icon-before-mount', '0 0 24 24' )
  },
}
</script>

<style lang="scss" scoped>

</style>
