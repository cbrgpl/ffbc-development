<template >
  <zButton class="flex items-center min-w-min" >
    <zIconBrand
      :icon-name="iconName"
      :class="shrinkIconClasses"
      :width="iconSize"
      :height="iconSize" ></zIconBrand>
    <div :class="shrinkContentClasses" >
      <slot />
    </div>
  </zButton>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import zButton from '@components/atomic/zButton.vue'

export default {
  name: 'zButtonIcon',
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
        this.shrink ? 'mr-0' : 'mr-2',
        this.shrink ? this.getResponsiveClass( 'mr-2' ) : ''
      ]
    },
    shrinkContentClasses () {
      return [
        this.shrink ? 'hidden' : '',
        this.shrink ? this.getResponsiveClass( 'block' ) : '',
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
