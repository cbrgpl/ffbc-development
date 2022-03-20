<template >
  <form
    class="container mx-auto"
    @submit.stop.prevent="submitForm" >

    <h4 class="underline mb-3" >
      {{ title }}
    </h4>

    <div class="grid grid-cols-1 justify-between items-end sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-3" >
      <component
        v-for="(fieldId, formField) in form"
        :key="fieldId"
        :form-field="form[formField].name"
        v-model="form[formField].value"
        :error="v$[formField].$error"
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

import { reactive, computed, watch, ref } from 'vue'

const generateMeasureObject = ( measureFields, measureFieldCallback ) => {
  const result = {}

  for ( const field of measureFields ) {
    result[ field.id ] = measureFieldCallback( field )
  }

  return result
}

const getMeasureFieldVal = ( field ) => ( { name: field.name, value: '' } )
const getMeasureFieldValidation = () => ( {
  value: {
    required,
    numeric
  }
} )

const getFormVariables = ( props ) => {
  const form = computed( () => reactive( generateMeasureObject( props.measureFields, getMeasureFieldVal ) ) )

  const validations = computed( () => generateMeasureObject( props.measureFields, getMeasureFieldValidation ) )

  return { form, validations }
}

export default {
  name: 'MeasureForm',
  emit: [ 'measureSubmit' ],
  props: {
    measureFields: {
      type: Array,
      required: true,
    },
    measureFieldComponent: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: ''
    },
  },
  setup ( props ) {
    const { form, validations } = getFormVariables( props )
    const v$ = ref( useVuelidate( validations, form ) )

    watch( props.measureFields, () => {
      v$.value = useVuelidate( validations, form )
    } )

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
