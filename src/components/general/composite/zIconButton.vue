<template >
  <zButton class="flex items-center justify-center min-w-mi" >
    <zIconBase
      :icon="icon"
      :class="[...responsiveVisibility]"
      :title="iconTitle"
      :width="iconSize"
      :height="iconSize" />
    <span
      v-if="defaultSlotFill"
      :class="['mr-2', ...responsiveVisibility]" ></span>
    <div >
      <slot />
    </div>
  </zButton>
</template>

<script >
import zButton from '@general_components/atomic/zButton.vue'

export default {
  name: 'ZIconButton',
  components: {
    zButton,
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    },
    unshrinkBreakpoint: {
      type: String,
      default: 'sm'
    },
    icon: {
      type: String,
      required: true,
    },
    iconTitle: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 25,
    }
  },
  computed: {
    responsiveVisibility () {
      return [
        this.shrink ? 'hidden' : '',
        this.shrink ? this.getResponsiveClass( 'inline-block' ) : '',
      ]
    },
    defaultSlotFill () {
      return !!this.$slots.default
    }
  },
  methods: {
    getResponsiveClass ( defaultClass ) {
      return `${ this.unshrinkBreakpoint }:${ defaultClass }`
    }
  },
}
</script>

<style lang="scss" scoped >

</style>
