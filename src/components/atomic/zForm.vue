<template >
  <form
    class="w-full"
    :ref="formRef"
    @submit.prevent="validateFields"
    @keydown.enter.prevent="controlFocus" >
    <slot />
    <div class="mb-5" >
      <small
        v-if="vuelidateObject.$error || formError"
        class="text-danger font-semibold text-base leading-tight" >
        {{ onFormError }}
      </small>
    </div>

    <slot name="button" >

    </slot>
  </form>
</template>

<script>
export default {
  name: 'zForm',
  emits: [ 'validate' ],
  props: {
    vuelidateObject: {
      type: Object,
      required: true,
    },
    enterable: {
      type: Boolean,
      default: true,
    },
    formError: {
      type: Boolean,
      default: false,
    },
    onFormError: {
      type: String,
      default: '',
    }
  },
  data () {
    return {
      statuses: {
        valid: 'VALID',
        invalid: 'INVALID'
      }
    }
  },
  computed: {
    childInputs () {
      const htmlInputsCollection = this.form ? this.form.getElementsByClassName( 'z-input' ) : []
      const $inputsArray = []

      for ( const node of htmlInputsCollection ) {
        $inputsArray.push( node )
      }

      return $inputsArray
    }
  },
  methods: {
    validateFields () {
      if ( this.vuelidateObject._validation === false ) {
        return
      }

      this.vuelidateObject.$reset()
      this.vuelidateObject.$touch()

      if ( this.vuelidateObject.$invalid ) {
        this.$emit( 'validate', this.statuses.invalid )
      } else this.$emit( 'validate', this.statuses.valid )
    },
    controlFocus ( event ) {
      if ( !this.enterable ) {
        return
      }

      const $emitterInput = event.target
      const emitterIndex = this.childInputs.indexOf( $emitterInput )
      const lastInputIndex = this.childInputs.length - 1

      if ( emitterIndex !== lastInputIndex ) {
        this.childInputs[ emitterIndex + 1 ].focus()
      } else {
        this.validateFields()
      }
    },
    formRef ( el ) {
      this.form = el
    }
  },

}
</script>

<style lang="scss" scoped>

</style>
