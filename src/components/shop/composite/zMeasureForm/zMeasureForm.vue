<template >
  <form
    class="container mx-auto"
    @submit.stop.prevent="submitForm" >
    <h4 class="underline mb-3" >
      {{ title }}
    </h4>

    <div class="grid grid-cols-1 justify-between items-end sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-3" >
      <component
        :is="measureFieldComponent"
        v-for="(field, fieldId) in form"
        :key="fieldId"
        v-model.number="field.value"
        :form-field="field.name"
        :error="v$[fieldId].$error" />
    </div>

    <div >
      <slot name="formActions" >
      </slot>
    </div>
  </form>
</template>

<script >
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'

import { reactive, computed } from 'vue'
import zMeasureFieldInput from './zMeasureFieldInput.vue'

const getFormPartials = ( props ) => {
  const form = computed( () => reactive( createMeasureBasedObject( props.formFields, createField ) ) )
  const validations = computed( () => createMeasureBasedObject( props.formFields, createFieldValidation ) )

  return { form, validations }
}

const createMeasureBasedObject = ( measureFields, create ) => {
  const result = {}

  for ( const field of measureFields ) {
    result[ field.id ] = create( field )
  }

  return result
}

const createField = ( field ) => ( {
  value: field.value,
  id: field.id,
  name: field.name
} )

const createFieldValidation = () => ( {
  value: {
    required,
    numeric
  }
} )

export default {
  name: 'MeasureForm',
  emit: [ 'measureSubmit' ],
  expose: [ 'submitForm' ],
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
  emits: [ 'measureSubmit' ],
  setup ( props ) {
    const { form, validations } = getFormPartials( props )
    const v$ = useVuelidate( validations, form )

    return { v$, form }
  },
  watch: {
    formFields: {
      handler () {
        this.v$.$reset()
      },
      flush: 'post'
    },
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

<style lang="scss" scoped >
</style>
