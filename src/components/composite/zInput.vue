<template >
  <label
    class="block relative"
    v-bind="styles" >
    <input
      placeholder=" "
      class="z-input"
      v-bind="attrs"
      :value="modelValue"
      @input="$emit( 'update:modelValue', $event.target.value )"
      type="text"
      :data-error-state="errorState" >

    <h1 class="z-input__label" >
      <zIconBrand
        v-if="icon"
        class="mr-2"
        width="25"
        height="25" />
      {{ label }}
    </h1>

    <h2
      v-show="errorState"
      class="z-input__error" >
      {{ onError }}
    </h2>
  </label>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import extenderMixin from '@mixins/extender.mixin.js'

export default {
  name: 'zInput',
  mixins: [ extenderMixin ],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: ''
    },
    onError: {
      type: String,
      default: ''
    },
    errorState: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    }
  },
  emits: [ 'update:modelValue' ],
  components: {
    zIconBrand: defineAsyncComponent( () => import( '@components/composite/zBrandIcon.vue' ) ),
  },
}
</script>

<style lang="scss" scoped>
.z-input {
  @apply bg-transparent border-2  border-primary-lighten border-solid  text-white rounded-md cursor-pointer pl-4 py-3 pr-2;

  &:hover + .z-input__label {
    @apply text-primary-darken text-opacity-60;
  }

  &:focus {
    @apply ring-4 ring-primary ring-opacity-10;

    & + .z-input__label {
      @apply text-primary;
    }
  }

  &:placeholder-shown + .z-input__label {
    @apply top-2/4 -translate-y-2/4;
  }

  &[data-error-state="true"] + .z-input__label {
    @apply text-danger-darken text-opacity-80;
  }
}

.z-input__label {
  @apply flex items-center text-placeholder bg-black-lighten cursor-pointer select-none leading-5 absolute transform left-4 top-0 -translate-y-2/4 px-1 transition-all;
}

.z-input__error {
  @apply text-danger absolute top-full left-0 transform translate-y-1;
}
</style>
