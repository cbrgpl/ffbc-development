<template >
  <div >
    <zInput
      class="mb-1.5"
      v-bind="$attrs" />
    <zValidationList :validations="validations" />
  </div>
</template>

<script >
import zValidationList from './partial/zValidationList.vue'

export default {
  name: 'ZValidationInput',
  components: {
    zValidationList
  },
  inheritAttrs: false,
  props: {
    validations: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style >

</style>
