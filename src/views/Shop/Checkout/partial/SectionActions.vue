<template >
  <div >
    {{ actionsDisabled.value }}
    <zButton @click="showNext" >
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
