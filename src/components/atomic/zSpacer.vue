<template >
  <span :class="spaceClass" >

  </span>
</template>

<script>
export default {
  name: 'zSpacer',
  props: {
    space: {
      type: [ Number, String ],
      default: 4
    },
  },
  computed: {
    spaceClass () {
      return 'mb-' + this.space
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
