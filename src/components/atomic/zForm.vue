<template >
  <form
    ref="form"
    @submit.prevent="validateFields"
    @keydown.enter.prevent="controlFocus" >
    <slot />
  </form>
</template>

<script>
export default {
  name: 'zForm',
  props: {
    validationObject: {
      type: Object,
      default () {
        console.warn( 'validationObject was not passed to the Form component;' )

        return {
          _validation: false,
        }
      }
    },
    enterable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    childrenInputs () {
      const refs = this.$refs
      const htmlInputsCollection = refs.form ? refs.form.getElementsByClassName( 'z-input' ) : []
      const $inputsArray = []

      for ( const node of htmlInputsCollection ) {
        $inputsArray.push( node )
      }

      return $inputsArray
    }
  },
  methods: {
    validateFields () {
      if ( this.validationObject._validation === false ) {
        return
      }

      this.validationObject.$reset()
      this.validationObject.$touch()
    },
    controlFocus ( event ) {
      if ( !this.enterable ) {
        return
      }

      const $emitterInput = event.target
      const emitterIndex = this.childrenInputs.indexOf( $emitterInput )
      const lastInputIndex = this.childrenInputs.length - 1

      if ( emitterIndex !== lastInputIndex ) {
        this.childrenInputs[ emitterIndex + 1 ].focus()
      } else {
        this.validateFields()
        this.$emit( 'submit' )
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
