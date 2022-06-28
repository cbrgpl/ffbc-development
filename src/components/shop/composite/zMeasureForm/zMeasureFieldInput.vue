<template >
  <label class="relative" >
    <h5 class="break-words pl-2 mb-1" >
      {{ formField }}
    </h5>

    <zInput
      :error-state="error"
      on-error="Field is required"
      mask="9999"
      v-bind="$attrs"
      @input="emitUpdateModelValue"
      size="sm"
      type="text" >

      <template
        #error-label= "{errorState, onError}" >
        <h5
          v-if="errorState"
          class="absolute text-danger right-2 top-0" >
          {{ onError }}
        </h5>
      </template>
    </zInput>
  </label>
</template>

<script>
export default {
  name: 'MeasureFieldInput',
  inheritAttrs: false,
  props: {
    formField: {
      type: String,
      required: true,
    },
    error: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    emitUpdateModelValue ( event ) {
      this.$emit( 'update:modelValue', event.target.value )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
