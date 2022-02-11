<template >
  <div class="relative" >
    <zInput
      @focus="inputFocused = true"
      @blur="inputFocused = false"
      class="password-input"
      v-bind="$attrs" />
    <Tooltip
      :class="['password-tooltip', passwordTooltipStyles]"
      :password-requirements="passwordRequirements" />
  </div>
</template>

<script>
import Tooltip from './partial/Tooltip.vue'

export default {
  name: 'zPasswordInput',
  inheritAttrs: false,
  props: {
    passwordRequirements: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      inputFocused: false,
    }
  },
  computed: {
    passwordTooltipStyles () {
      return this.inputFocused ? 'password-tooltip_visible' : ''
    }
  },
  components: {
    Tooltip
  }
}
</script>

<style lang="scss" scoped>
.password-tooltip {
  opacity: 0;
  pointer-events: none;

  transition: all 450ms;
  transform: translateY(20px);

  &_visible {
    opacity: 1;
    pointer-events: all;
    transform: translateY(5px);
  }
}

@keyframes tooltip-appear {
  100% {

  }
}
</style>
