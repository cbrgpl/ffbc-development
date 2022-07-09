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

<script >

export default {
  name: 'SectionActions',
  inject: [
    'actionsDisabled',
    'actionsLoader'
  ],
  emits: [ 'showNext' ],
  methods: {
    showNext () {
      this.$emit( 'showNext' )
    }
  }
}
</script>

<style lang="scss" >

</style>
