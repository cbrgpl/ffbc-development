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
  name: 'ZCheckboxMulti',
  components: {
    zCheckbox,
  },
  mixins: [ preventModel ],
  props: {
    value: {
      type: [ String, Number, Boolean ],
      required: true,
    },
  },
  emits: [ 'update:modelValue' ],
  methods: {
    handleValue ( event ) {
      const isChecked = event.target.checked
      const modelCopy = this.modelValue.slice()

      if ( isChecked ) {
        modelCopy.push( this.value )
      } else {
        modelCopy.splice( modelCopy.indexOf( this.value ), 1 )
      }

      this.$emit( 'update:modelValue', modelCopy )
    }
  },
}
</script>

<style lang="scss" scoped >

</style>
