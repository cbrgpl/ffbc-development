<template >
  <zButton class="flex items-center justify-center min-w-mi" >
    <zIconBase
      :icon-name="iconName"
      :class="[...responsiveVisibility]"
      :title="iconTitle"
      :width="iconSize"
      :height="iconSize" ></zIconBase>
    <span
      v-if="defaultSlotFill"
      :class="['mr-2', ...responsiveVisibility]" ></span>
    <div >
      <slot />
    </div>
  </zButton>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import zButton from '@components/atomic/zButton.vue'

export default {
  name: 'zIconButton',
  props: {
    shrink: {
      type: Boolean,
      default: false
    },
    unshrinkBreakpoint: {
      type: String,
      default: 'sm'
    },
    iconName: {
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
  components: {
    zButton,
    zIconBrand: defineAsyncComponent( () => import( '@components/composite/zIconBase.vue' ) )
  },
}
</script>

<style lang="scss" scoped>

</style>
