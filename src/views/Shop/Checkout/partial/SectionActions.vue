<template >
  <div class="w-full" >
    <zLoaderButton
      class="w-full max-w-xs float-right px-4.5 py-3.5"
      :loader="loading"
      @click="emitPressed" >
      <slot />
    </zLoaderButton>
  </div>
</template>

<script >

export default {
  name: 'SectionActions',
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  emits: [ 'pressed' ],
  methods: {
    emitPressed () {
      this.$emit( 'pressed' )
    }
  }
}
</script>

<style lang="scss" >

</style>
