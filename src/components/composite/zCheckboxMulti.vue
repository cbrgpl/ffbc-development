<template >
  <zCheckbox
    @update:modelValue="handleValue"
    v-bind="attrs" />
</template>

<script>
import preventModel from '@mixins/preventModel.mixin.js'
import zCheckbox from '@components/atomic/zCheckbox.vue'

export default {
  name: 'zCheckboxMulti',
  mixins: [ preventModel ],
  props: {
    value: {
      type: [ String, Number, Boolean ],
      required: true,
    },
  },
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
  components: {
    zCheckbox,
  },
}
</script>

<style lang="scss" scoped>

</style>
