<template >
  <div

    class="h-12 w-full bg-black-lighten border-b border-placeholder border-opacity-25 border-solid" >
    <div
      class="h-full inline-flex items-center pr-8"
      @click="$emit('goBack')" >
      <span
        class="w-8 h-8 mr-3" >
        <zIconBase icon="backArrow" ></zIconBase>
      </span>

      <span class="text-2xl underline select-none" >
        {{ pageName }}
      </span>
    </div>
  </div>
</template>

<script >
export default {
  name: 'TheBackBar',
  props: {
    pageName: {
      type: String,
      required: true,
    }
  },
  emits: [ 'goBack' ]
}
</script>

<style scoped lang="scss" >

</style>
