<template >
  <label
    @change="updateModelValue"
    class="inline-flex items-center"
    v-bind="wrapperAttrs" >
    <span class="inline-block mr-1.5 relative cursor-pointer" >
      <input
        v-bind="attrs"
        :value="value"
        class="radio-button__input absolute opacity-0 pointer-events-none"
        type="radio" >
      <span class="radio-button__inner absolute right-2/4 bottom-2/4 transform translate-x-2/4 translate-y-2/4 w-4 h-4 bg-white rounded-full opacity-0 transition-opacity" >
      </span>
      <div class="w-6 h-6 border-2 border-solid border-primary-darkest rounded-full text-lg" ></div>
    </span>
    <span >
      <slot />
    </span>
  </label>
</template>

<script>
import extenderMixin from '@/helpers/mixins/extender.mixin'

export default {
  name: 'zRadioButton',
  props: {
    value: {
      required: true,
    }
  },
  mixins: [ extenderMixin ],
  methods: {
    updateModelValue () {
      this.$emit( 'update:modelValue', this.value )
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-button__input:checked + .radio-button__inner {
  opacity: 1;
}
</style>
