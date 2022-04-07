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
  inject: [ 'fakeOrderMeasures' ],
  computed: {
    measureGroups () {
      return this.$store.getters[ 'measure/groupMeasureFields' ]( this.fakeOrderMeasures, ( measureField ) => measureField.measureField )
    },
  },
  components: {
    OrderDetailsMeasuresSection
  }

}
</script>

<style lang="scss" scoped>

</style>
