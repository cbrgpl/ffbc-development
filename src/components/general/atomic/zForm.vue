<template >
  <form
    class="w-full"
    :ref="formRef"
    @submit.prevent="validateFields"
    @keydown.enter.prevent="controlFocus" >
    <slot />
    <div
      v-if="state !== null" >
      <small
        :class="['text-base leading-tight tracking-wider', getStateColorStyle]" >
        {{ getStateMessage }}
      </small>
    </div>

    <slot name="actions" >

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
    state: {
      type: [ Boolean, Object ],
      default () {
        return null
      },
      validator ( value ) {
        return typeof value === 'boolean' || value === null
      }
    },
    errorMessage: {
      type: String,
      default: '',
    },
    successMessage: {
      type: String,
      default: ''
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
    },
    getStateMessage () {
      if ( this.state !== null ) {
        return this.state ? this.successMessage : this.errorMessage
      } else {
        return ''
      }
    },
    getStateColorStyle () {
      if ( this.state !== null ) {
        return this.state ? 'text-safety' : 'text-danger'
      } else {
        return ''
      }
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
        this.$emit( 'validate', STATUS_WORDS.ERROR )
      } else this.$emit( 'validate', STATUS_WORDS.SUCCESS )
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
