<template >
  <div class="w-full" >
    <zLoaderButton
      class="w-full max-w-xs float-right px-4.5 py-3.5"
      type="submit"
      :loader="actionsLoader.value"
      @click="showNext" >
      Next
    </zLoaderButton>
  </div>
</template>

<script>

export default {
  name: 'SectionActions',
  emits: [ 'show-next' ],
  inject: [
    'actionsDisabled',
    'actionsLoader'
  ],
  methods: {
    showNext () {
      this.$emit( 'show-next' )
    }
  }
}
</script>

<style lang="scss">

</style>
