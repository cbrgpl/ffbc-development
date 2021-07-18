<template >
  <zCheckbox
    @update:modelValue="handleValue"
    v-bind="attrs" />
</template>

<script>
import preventModel from '@mixins/preventModel.mixin.js'
import zCheckbox from '@components/atomic/zCheckbox.vue'

export default {
  name: 'zCheckboxSingle',
  mixins: [ preventModel ],
  methods: {
    handleValue ( event ) {
      const target = event.target
      this.$emit( 'update:modelValue', target.checked )
    }
  },
  components: {
    zCheckbox,
  },
}
</script>

<style lang="scss" scoped>

</style>
