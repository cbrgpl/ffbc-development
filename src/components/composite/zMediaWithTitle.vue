<template >
  <div
    class="relative"
    v-bind="styles" >
    <zMedia
      class="h-full"
      v-bind="attrs" />

    <div
      class="bg-black bg-opacity-40 coarse:opacity-100 opacity-0 hover:opacity-100 pointer-events-none transition-opacity absolute z-10 top-0 left-0 w-full h-full"
      v-if="title !== null" >
      <div class="flex items-end h-full select-none pb-3 pl-2" >
        <slot name="title" >
          {{ title }}
        </slot>
      </div>
    </div>

  </div>
</template>

<script>
import { extenderMix } from '@mixins'

export default {
  name: 'zMediaWithTitle',
  mixins: [ extenderMix ],
  props: {
    title: {
      type: String,
      default: null
    }
  },

}
</script>

<style lang="scss" scoped>

</style>
