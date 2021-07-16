<template >
  <g >
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </g>
</template>

<script>
export default {
  name: 'IconWarning',
  beforeMount () {
    this.$emit( 'icon-before-mount', '0 0 24 24' )
  },
}
</script>

<style lang="scss" scoped>

</style>
