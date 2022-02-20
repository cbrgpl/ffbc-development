<template >
  <zTabNav v-model="modelValue" >
    <template v-slot="{tab}" >
      <slot :tab="tab" ></slot>
    </template>
  </zTabNav>
</template>

<script>
import zTabNav from '@/components/atomic/zTabNav.vue'

export default {
  name: 'zTabRouteNavigation',
  props: {
    initialValue: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      modelValue: this.initialValue,
    }
  },
  components: {
    zTabNav
  }
}
</script>

<style lang="scss" scoped>

</style>
