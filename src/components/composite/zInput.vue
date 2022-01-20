<template >
  <label
    class="block relative mb-5"
    v-bind="styles" >
    <!-- TODO Создать отдельный инпут Password с кнопочкой для переделывания пароля в текст -->
    <input
      placeholder=" "
      class="z-input"
      :value="modelValue"
      @input="$emit( 'update:modelValue', $event.target.value )"
      v-mask="mask"
      type="text"
      :data-error-state="errorState"
      v-bind="attrs" >

    <h5 class="z-input__label" >
      <zIconBrand
        v-if="icon"
        class="mr-2"
        width="25"
        height="25" />
      {{ label }}
    </h5>

    <small
      v-show="errorState"
      class="z-input__error" >
      {{ onError }}
    </small>
  </label>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mask } from '@directives/index.js'
import extenderMixin from '@mixins/extender.mixin.js'

export default {
  name: 'zInput',
  emits: [ 'update:modelValue' ],
  mixins: [ extenderMixin ],
  props: {
    modelValue: {
      type: [ String, Number ],
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
    mask: {
      type: [ String, Array ],
      default: ''
    },
    errorState: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    mask
  },
  components: {
    zIconBrand: defineAsyncComponent( () => import( '@components/composite/zBrandIcon.vue' ) ),
  },
}
</script>

<style lang="scss" scoped>
.z-input {
  @apply bg-transparent border-2  border-primary-lighten border-solid
    text-white rounded-md cursor-pointer pl-4 py-3 pr-2 w-full;

  &:hover + .z-input__label {
    @apply text-primary-darken text-opacity-60;
  }

  &:focus {
    @apply ring-4 ring-primary ring-opacity-20;

    + .z-input__label {
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
  @apply flex items-center text-placeholder bg-black-lighten cursor-pointer select-none leading-5
    absolute transform left-4 top-0 -translate-y-2/4 px-1 transition-all;
}

.z-input__error {
  @apply text-danger text-sm absolute top-full left-0 transform translate-y-0.5;
}
</style>
