<template >
  <label >
    <h5 class="break-words mb-1" >
      {{ formField }}
    </h5>

    <zInput
      :error-state="error"
      on-error="Field is required"
      mask="9999"
      v-bind="$attrs"
      @input="emitUpdateModelValue"
      size="sm"
      type="text" />
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
