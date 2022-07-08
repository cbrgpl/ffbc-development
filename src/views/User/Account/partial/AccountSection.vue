<template >
  <section >
    <slot />

    <div
      @click="toggleFormVisible" >
      <slot name="action" />
    </div>

    <slot
      v-if="formVisible"
      name="form" />
  </section>
</template>

<script >
export default {
  name: 'AccountSection',
  emits: [ 'formVisibilityToggled' ],
  data () {
    return {
      formVisible: false,
    }
  },
  watch: {
    formVisible ( newValue ) {
      this.$emit( 'formVisibilityToggled', newValue )
    },
  },
  methods: {
    toggleFormVisible () {
      this.formVisible = !this.formVisible
    },
    clearSection () {
      this.formVisible = false
    }
  }
}
</script>

<style lang="scss" scoped >

</style>
