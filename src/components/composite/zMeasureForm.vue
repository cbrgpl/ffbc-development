<template >
  <form
    class="container mx-auto"
    @submit.stop.prevent="submitForm" >

    <h4 class="underline mb-3" >
      {{ title }}
    </h4>

    <div class="grid grid-cols-1 justify-between items-end sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-3" >
      <component
        v-for="(value, formField) in form"
        :key="formField"
        :form-field="formField"
        v-model="form[formField]"
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

import { shallowReactive, computed } from 'vue'

const generateMeasureObject = ( measureFields, measureFieldCallback ) => {
  const result = {}

  for ( const field of measureFields ) {
    result[ field.name ] = measureFieldCallback( field )
  }

  return result
}

const getMeasureFieldVal = () => ''
const getMeasureFieldValidation = () => ( {
  required,
  numeric
} )

export default {
  name: 'MeasureForm',
  emit: [ 'submit' ],
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
      required: true,
    },
  },
  setup ( props ) {
    const { measureFields } = props

    const form = shallowReactive( generateMeasureObject( measureFields, getMeasureFieldVal ) )

    const validations = computed( () => generateMeasureObject( measureFields, getMeasureFieldValidation ) )
    const v$ = useVuelidate( validations, form )

    return { v$, form }
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
