<template >
  <div class="flex items-center h-12 w-full px-1.5 bg-black-lighten border-b border-placeholder border-opacity-25 border-solid" >
    <span
      class="w-8 h-8 mr-3"
      @click="$emit('goBack')" >
      <zIconBase icon-name="backArrow" ></zIconBase>
    </span>

    <span class="text-2xl underline select-none" >
      {{ pageName }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TheBackBar',
  emits: [ 'goBack' ],
  props: {
    pageName: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped lang="scss">

</style>
