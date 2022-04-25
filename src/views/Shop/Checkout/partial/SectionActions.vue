<template >
  <div class="w-full" >
    <zButton
      class="w-full max-w-xs float-right px-4.5 py-3.5"
      type="submit"
      @click="showNext" >
      Next
    </zButton>
  </div>
</template>

<script>

export default {
  name: 'SectionActions',
  emits: [ 'show-next' ],
  inject: [
    'actionsDisabled'
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
