<template >
  <label
    class="flex items-center relative cursor-pointer"
    v-bind="styles" >
    <input
      @change="$emit( 'update:modelValue', $event)"
      class="z-checkbox"
      v-bind="attrs"
      type="checkbox" >
    <div
      :class="['z-checkbox__fiction', ...checkboxSize]"
      :data-error-state="errorState" >
    </div>
    <h2 class="z-checkbox__label" >
      {{ label }}
    </h2>
  </label>
</template>

<script>
import extenderMixin from '@mixins/extender.mixin.js'

export default {
  name: 'zCheckbox',
  mixins: [ extenderMixin ],
  props: {
    label: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 6
    },
    errorState: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    checkboxSize () {
      return [
        `w-${ this.size }`,
        `h-${ this.size }`
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.z-checkbox {
  @apply absolute opacity-0 z-0;

  &:checked {
    & + .z-checkbox__fiction {
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
    content: '';

    @apply block w-full h-full border-b-4 border-l-4 border-white rounded-bl-sm transform skew-y-6 -rotate-45 -translate-y-px opacity-0 transition-opacity;
  }
}

.z-checkbox__label {
  @apply text-white select-none;
}
</style>
