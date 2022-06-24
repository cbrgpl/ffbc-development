<template >
  <zButton
    class="relative"
    :disabled="loader"
    v-bind="$attrs" >

    <slot ></slot>

    <div
      v-if="loader"
      class="flex absolute w-full h-full bg-black-lighten bg-opacity-50 top-0 left-0" >
      <zLoader
        :height="40"
        :width="40" />
    </div>
  </zButton>
</template>

<script>
import { defineAsyncComponent } from 'vue'

import zButton from '@general_components/atomic/zButton.vue'

export default {
  name: 'zLoaderButton',
  props: {
    loader: {
      type: Boolean,
      required: true
    },
  },
  components: {
    zButton,
    zLoader: defineAsyncComponent( () => import( '@general_components/atomic/zLoader.vue' ) )
  },
}
</script>

<style lang="scss">
</style>
