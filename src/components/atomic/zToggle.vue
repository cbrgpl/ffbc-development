<template >
  <label
    v-bind="styles"
    class="z-toggle" >
    <input
      v-bind="attrs"
      ref="checkbox"
      class="hidden"
      @change="$emit('update:modelValue', $event.target.checked, value)"
      type="checkbox" >
    <span
      class="z-toggle__slider" ></span>
  </label>
</template>

<script>
import extender from '@mixins/extender.mixin.js'

export default {
  mixins: [ extender ],
  props: {
    modelValue: {
      type: [ Boolean, String ],
      default: false
    },
    value: {
      type: [ String, Number, Boolean ],
      default: null
    }
  },

  // TODO Я знаю, что тут можно более изящно сделать, но не помню как. watcher+mounted соединить в одно
  watch: {
    modelValue () {
      this.updateView()
    }
  },
  mounted () {
    this.updateView()
  },
  methods: {
    updateView () {
      const refs = this.$refs

      if ( refs.checkbox ) {
        refs.checkbox.checked = this.modelValue
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.z-toggle {
  @apply block cursor-pointer;
}

.z-toggle__slider {
  @apply block w-8 h-4 filter grayscale bg-secondary-darken rounded-3xl relative;

  &::after {
    content: '';

    // left-1
    @apply block rounded-full w-3 h-3 bg-secondary absolute transform bottom-2/4 translate-y-2/4 left-1 transition-all;
  }
}

input:checked {
  & + .z-toggle__slider {
    @apply grayscale-0;

    &::after {
      @apply left-full -translate-x-4;
    }
  }
}
</style>
