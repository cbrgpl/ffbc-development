<template >
  <div class="w-full px-1.5 py-1" >
    <slot >
      {{ item }}
    </slot>
  </div>
</template>

<script>

export default {
  name: 'zSelectItem',
  props: {
    item: {
      type: [ Object, String ],
      required: true,
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
