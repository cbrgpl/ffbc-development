<template >
  <div >
    <div >
      <zMultipleMeasures
        ref="measureForm"
        :measures="orderMeasures"
        @submitted="hantdleFormSubmiting" >
      </zMultipleMeasures>
    </div>
  </div>
</template>

<script >
import CheckoutSectionMix from '@mixins/CheckoutSection'

import zMultipleMeasures from '@shop_components/composite/zMeasureForm/zMultipleMeasures.vue'

export default {
  name: 'Measures',
  components: {
    zMultipleMeasures
  },
  mixins: [ CheckoutSectionMix ],
  inject: [ 'orderId' ],
  props: {
    bindedCartItems: {
      type: Object,
      required: true,
    }
  },
  emits: [ 'sectionCompleted' ],
  data () {
    return {
      filledMeasures: {}
    }
  },
  computed: {
    orderMeasures () {
      return this.$store.getters[ 'measure/measures' ].filter( ( measure ) => this.orderMeasureIds.includes( measure.id ) )
    },
    orderMeasureIds () {
      const orderMeasureIds = []

      for ( const productType of this.orderProductTypes ) {
        const productTypeMeasures = productType.measureCategories

        for ( const measureId of productTypeMeasures ) {
          if ( !orderMeasureIds.includes( measureId ) ) {
            orderMeasureIds.push( measureId )
          }
        }
      }

      return orderMeasureIds
    },
    orderProductTypes () {
      const productTypes = this.$store.getters[ 'product/allProductTypes' ]
      const orderProductTypes = []

      for ( const productTypeId of this.orderProductTypeIds ) {
        orderProductTypes.push( productTypes.find( ( productType ) => productType.id === productTypeId ) )
      }

      return orderProductTypes
    },
    

    orderProductTypeIds () {
      const orderProductTypeIds = []

      for ( const bindedCartItem of this.bindedCartItems ) {
        if ( !orderProductTypeIds.includes( bindedCartItem.product.type ) ) {
          orderProductTypeIds.push( bindedCartItem.product.type )
        }
      }

      return orderProductTypeIds
    },
    
    
  },
  methods: {
    // Public
    completeSection() {
      this.$refs.measureForm.submit()
    },


    // Private
    handleFormSubmitting( measures ) {
      const formattedMeasures = this.formatMeasures( measures )
      this.emitSectionCompleted( formattedMeasures )
    },
    formatMeasures ( measures ) {
      return measures.reduce( ( acc, measure ) => {
        const formattedMeasureFields = this.formatMeasureFields( measure ) 

        acc.push( ...formattedMeasureFields )

        return acc
      }, [] )
    },
    formatMeasureFields( measure ) {
      const measureFields = []

      for ( const measureFieldId in measure ) {
        const measureField = measure[ measureFieldId ]

        measureFields.push( {
          value: measureField.value,
          order: this.orderId,
          measureField: measureField.id
        } )
      }

      return measureFields
    },
  }

}
</script>

<style lang="scss" >

</style>
