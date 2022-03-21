<template >
  <div >
    <zCheckboxSingle
      class="mb-4"
      @change="emitUnselectService"
      v-model="serviceSelected"
      :label="service" />
    <zInput
      @input="emitUpdateServiceId"
      label="Enter your identificator in service"
      v-if="serviceSelected"
      class="flex-grow" />
  </div>
</template>

<script>
export default {
  name: 'UserContactField',
  emits: [ 'update:modelValue' ],
  props: {
    service: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      serviceSelected: false,
    }
  },
  methods: {
    emitUpdateServiceId ( event ) {
      this.$emit( 'update:modelValue', { service: this.service, id: event.target.value } )
    },
    emitUnselectService () {
      this.$emit( 'update:modelValue', { service: this.service, id: '' } )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
