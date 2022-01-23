<template >
  <div >
    <zInput
      class="mb-1.5"
      v-bind="$attrs" />
    <zValidationList :validations="validations" />
  </div>
</template>

<script>
import zValidationList from './partial/zValidationList.vue'

export default {
  name: 'zValidationInput',
  inheritAttrs: false,
  props: {
    validations: {
      type: Array,
      required: true,
    }
  },
  components: {
    zValidationList
  }
}
</script>

<style>

</style>
