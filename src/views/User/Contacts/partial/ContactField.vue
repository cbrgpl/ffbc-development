<template >
  <div >
    <!-- :checked="showInput" -->
    <zCheckboxSingle
      v-model="showInput"
      class="mb-4"
      :label="contactType.name"
      @change="emitUnselectService" />
    <zInput
      v-if="showInput"
      :value="modelValue"
      label="Enter your identificator in service"
      class="flex-grow"
      @input="emitUpdateServiceId" />
  </div>
</template>

<script >
export default {
  name: 'UserContactField',
  props: {
    contactType: {
      type: Object,
      required: true,
    },
    // eslint-disable-next-line vue/require-prop-types
    modelValue: {
      required: true
    },
    showInputOnInit: {
      type: Boolean,
      required: true,
    }
  },
  emits: [ 'update:modelValue' ],
  data () {
    return {
      fieldSelected: false,
    }
  },
  computed: {
    showInput: {
      get () {
        return this.fieldSelected || this.showInputOnInit
      },
      set ( value ) {
        this.fieldSelected = value
      }
    }
  },
  methods: {
    emitUpdateServiceId ( event ) {
      this.$emit( 'update:modelValue', { typeId: this.contactType.id, id: event.target.value } )
    },
    emitUnselectService () {
      this.$emit( 'update:modelValue', { typeId: this.contactType.id, id: '' } )
    }
  }
}
</script>

<style lang="scss" scoped >

</style>
