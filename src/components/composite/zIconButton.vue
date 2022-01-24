<template >
  <zButton class="flex items-center min-w-mi" >
    <zIconBrand
      :icon-name="iconName"
      :class="['mr-2',...shrinkIconClasses]"
      :width="iconSize"
      :height="iconSize" ></zIconBrand>
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
      default: 'fitness',
    },
    iconSize: {
      type: Number,
      default: 25,
    }
  },
  computed: {
    shrinkIconClasses () {
      return [
        this.shrink ? 'hidden' : '',
        this.shrink ? this.getResponsiveClass( 'inline-block' ) : '',
      ]
    },
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
