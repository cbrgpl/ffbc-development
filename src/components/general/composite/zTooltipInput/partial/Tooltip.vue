<template >
  <div
    :style="zIndexStyle"
    class="absolute top-full transform translate-y-2.5 border border-white border-solid bg-black rounded-md select-none cursor-pointer" >
    <ul class="px-2 py-3.5 -mb-2.5" >
      <li
        v-for="requirement of passwordRequirements"
        :key="requirement"
        class="mb-2.5 flex items-center" >
        <div class="w-2 h-2 mr-1 bg-primary rounded-sm flex-shrink-0" ></div>
        {{ requirement }}
      </li>
    </ul>
  </div>
</template>

<script >
import getZIndex from '@functions/getZIndex.function'

export default {
  name: 'PasswordRequirementsTooltip',
  props: {
    passwordRequirements: {
      type: Array
    },
  },
  computed: {
    zIndexStyle () {
      return {
        'z-index': getZIndex()
      }
    }
  },
}
</script>

<style >

</style>
