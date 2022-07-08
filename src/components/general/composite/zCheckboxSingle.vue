<template >
  <zCheckbox
    :checked="modelValue"
    v-bind="attrs"
    @update:modelValue="handleValue" />
</template>

<script >
import preventModel from '@mixins/preventModel.mixin.js'
import zCheckbox from '@general_components/atomic/zCheckbox.vue'

export default {
  name: 'ZCheckboxSingle',
  components: {
    zCheckbox,
  },
  mixins: [ preventModel ],
  methods: {
    handleValue ( event ) {
      const target = event.target
      this.$emit( 'update:modelValue', target.checked )
    }
  },
}
</script>

<style lang="scss" scoped >

</style>
