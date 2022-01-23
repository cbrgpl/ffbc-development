<template >
  <label
    class="flex items-center relative cursor-pointer"
    v-bind="styles" >
    <input
      :checked="checked"
      @change="$emit( 'update:modelValue', $event)"
      class="z-checkbox"
      v-bind="attrs"
      type="checkbox" >
    <div
      class="z-checkbox__fiction w-6 h-6"
      :data-error-state="errorState" >
    </div>
    <h5 class="z-checkbox__label" >
      {{ label }}
    </h5>
  </label>
</template>

<script>
import extenderMixin from '@mixins/extender.mixin.js'

export default {
  name: 'zCheckbox',
  mixins: [ extenderMixin ],
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      default: ''
    },
    errorState: {
      type: Boolean,
      default: false,
    },
    onError: {
      type: String,
      default: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.z-checkbox {
  @apply absolute opacity-0 z-0;

  &:checked {
    + .z-checkbox__fiction {
      &::after {
        @apply opacity-100;
      }
    }
  }
}

.z-checkbox__fiction {
  @apply bg-primary border-2 border-solid border-primary rounded-md mr-2 relative p-1;

  &[data-error-state="true"] {
    @apply border-danger;
  }

  &[data-error-state="true"] + .z-checkbox__label {
    @apply text-danger;
  }

  &::after {
    @apply block w-full h-full border-b-4 border-l-4 border-white rounded-bl-sm
      transform skew-y-6 -rotate-45 -translate-y-px opacity-0 transition-opacity;
    content: "";
  }
}

.z-checkbox__label {
  @apply text-white select-none;
}
</style>
