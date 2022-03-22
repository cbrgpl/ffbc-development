<template >

  <div >

    <!-- :checked="showInput" -->
    <zCheckboxSingle
      class="mb-4"
      @change="emitUnselectService"
      v-model="showInput"
      :label="contactType.name" />
    <zInput
      @input="emitUpdateServiceId"
      :value="modelValue"
      label="Enter your identificator in service"
      v-if="showInput"
      class="flex-grow" />
  </div>
</template>

<script>
export default {
  name: 'UserContactField',
  emits: [ 'update:modelValue' ],
  props: {
    contactType: {
      type: Object,
      required: true,
    },
    modelValue: {
      required: true
    },
    showInputOnInit: {
      type: Boolean,
      required: true,
    }
  },
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

<style lang="scss" scoped>

</style>
