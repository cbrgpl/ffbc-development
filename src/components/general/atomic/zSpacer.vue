<template >
  <span :class="spaceClass" >

  </span>
</template>

<script >
export default {
  name: 'ZSpacer',
  props: {
    space: {
      type: [ Number, String ],
      default: 4
    },
  },
  computed: {
    spaceClass () {
      return [ 'block', 'mb-' + this.space ]
    }
  },
}
</script>

<style lang="scss" scoped >

</style>
