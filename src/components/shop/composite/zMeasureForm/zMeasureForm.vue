<template >
  <form
    class="container mx-auto"
    @submit.stop.prevent="submitForm" >

    <h4 class="underline mb-3" >
      {{ title }}
    </h4>

    <div class="grid grid-cols-1 justify-between items-end sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-3" >

      <component
        v-for="(field, fieldId) in form"
        :key="fieldId"
        :form-field="field.name"
        v-model.trim="field.value"
        :error="v$[fieldId].$error"
        :is="measureFieldComponent" />
    </div>

    <div >
      <slot name="formActions" >
      </slot>
    </div>
  </form>
</template>

<script >
import useVuelidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'

import { reactive, computed, ref } from 'vue'
import zMeasureFieldInput from './zMeasureFieldInput.vue'

const generateMeasureObject = ( measureFields, measureFieldCallback ) => {
  const result = {}

  for ( const field of measureFields ) {
    result[ field.id ] = measureFieldCallback( field )
  }

  return result
}

const getMeasureFormField = ( field ) => ( {
  value: field.value,
  id: field.id,
  name: field.name
} )

const getMeasureFieldValidation = () => ( {
  value: {
    required,
    numeric
  }
} )

const getFormVariables = ( props ) => {
  const form = computed( () => reactive( generateMeasureObject( props.formFields, getMeasureFormField ) ) )
  const validations = computed( () => generateMeasureObject( props.formFields, getMeasureFieldValidation ) )

  return { form, validations }
}

export default {
  name: 'MeasureForm',
  emit: [ 'measureSubmit' ],
  props: {
    formFields: {
      type: Array,
      required: true,
    },
    measureFieldComponent: {
      type: Object,
      default: zMeasureFieldInput
    },
    title: {
      type: String,
      default: ''
    },
  },
  setup ( props ) {
    const { form, validations } = getFormVariables( props )
    const v$ = ref( useVuelidate( validations, form ) )

    return { v$, form, validations }
  },

  methods: {
    submitForm () {
      this.v$.$reset()
      this.v$.$touch()
      if ( this.v$.$error ) {
        return
      }

      this.$emit( 'measureSubmit', this.form )
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
