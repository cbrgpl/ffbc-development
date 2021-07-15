<template >
  <button
    v-bind="$attrs"
    :class="['z-button', variantClass]" >
    {{ text }}
    <slot ></slot>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'brick',
      validator: value => {
        return [
          'brick',
          'ghost',
          'sky',
          'danger',
          'safety'
        ].includes( value )
      }
    },
  },
  computed: {
    variantClass () {
      return `z-button--${ this.variant }`
    }
  },
}
</script>

<style lang="scss" scope>
.z-button {
  @apply rounded-md transition-colors;

  &:disabled {
    @apply bg-opacity-70 pointer-events-none cursor-default;
  }

  &--brick {
    @apply bg-primary text-white duration-200;

    &:hover {
      @apply bg-primary-darken;
    }

    &:active {
      @apply bg-primary-darken filter brightness-90;
    }

    &:focus {
      @apply ring-4 ring-primary-lighten ring-opacity-20;
    }

    &:disabled {
      @apply bg-primary-lightest text-black-lighten;
    }
  }

  &--ghost {
    @apply border-2 border-primary border-solid text-primary duration-500;

    &:hover {
      @apply bg-primary text-white;
    }

    &:active {
      @apply bg-primary-darken border-primary-lighten;
    }
  }

  &--sky {
    @apply text-primary transition-colors overflow-hidden relative;

    &::after {
      content: '';

      @include absolute-center;

      @apply block w-full h-28 origin-center bg-primary-lightest bg-opacity-10 -skew-y-6 -rotate-12 scale-x-0 transition-transform duration-300;
    }

    &:hover {
      @apply text-white ;

      &::after {
        @apply scale-x-105;
      }
    }

    &:disabled {
      @apply border-2 border-primary-lighten border-solid text-opacity-0;
    }
  }

  &--danger {
    @apply bg-danger text-black duration-200;

    &:hover {
      @apply bg-danger-darken;
    }

    &:active {
      @apply bg-danger-darken filter brightness-90;
    }

    &:focus {
      @apply ring-4 ring-danger-darken ring-opacity-20;
    }
  }

  &--safety {
    @apply bg-safety text-white duration-200;

    &:hover {
      @apply bg-safety-darken;
    }

    &:active {
      @apply bg-safety-darken filter brightness-90;
    }

    &:focus {
      @apply ring-4 ring-safety-darken ring-opacity-20;
    }
  }
}

</style>
