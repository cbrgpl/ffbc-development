<template >
  <div >
    <OrderDetailsMeasuresSection
      v-for="measureGroup of measureGroups"
      :key="measureGroup.id"
      :name="measureGroup.name"
      :measure-fields="measureGroup.measureFields" />
  </div>
</template>

<script>
import OrderDetailsMeasuresSection from './OrderDetailsMeasuresSection.vue'

export default {
  name: 'OrdererDetailsMeasures',
  inject: [ 'orderMeasures' ],
  computed: {
    measureGroups () {
      return this.$store.getters[ 'measure/groupMeasureFields' ]( this.orderMeasures.value, ( measureField ) => measureField.measureField )
    },
  },
  components: {
    OrderDetailsMeasuresSection
  }

}
</script>

<style lang="scss" scoped>

</style>
