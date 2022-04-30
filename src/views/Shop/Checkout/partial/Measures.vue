<template >
  <div >
    <div >
      <zMeasureForm
        class="mb-8 border-b border-solid border-placeholder last:border-none"
        v-for="measure of orderMeasures"
        :key="measure.id"
        :title="measure.name"
        :form-fields="measure.measureFields"
        @measureSubmit="setMeasureData(measure.name, $event)" >

        <template #formActions >
          <zButton
            class="px-2.5 py-2 my-3"
            :variant="getButtonType(measure.name)"
            type="submit" >
            Submit
          </zButton>
        </template>

      </zMeasureForm>
    </div>

    <SectionActions @show-next="emitSectionComplete" />
  </div>
</template>

<script>
import SectionActions from './SectionActions.vue'

import zMeasureForm from '@components/composite/zMeasureForm.vue'

export default {
  name: 'Measures',
  emits: [ 'section-complete' ],
  props: {
    bindedCartItems: {
      type: Object,
      required: true,
    }
  },
  inject: [ 'orderId' ],
  data () {
    return {
      filledMeasures: {}
    }
  },
  computed: {
    orderProductTypeIds () {
      const orderProductTypeIds = []

      for ( const bindedCartItem of this.bindedCartItems ) {
        if ( !orderProductTypeIds.includes( bindedCartItem.product.type ) ) {
          orderProductTypeIds.push( bindedCartItem.product.type )
        }
      }

      return orderProductTypeIds
    },
    orderProductTypes () {
      const productTypes = this.$store.getters[ 'product/allProductTypes' ]
      const orderProductTypes = []

      for ( const productTypeId of this.orderProductTypeIds ) {
        orderProductTypes.push( productTypes.find( ( productType ) => productType.id === productTypeId ) )
      }

      return orderProductTypes
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
    orderMeasures () {
      return this.$store.getters[ 'measure/measures' ].filter( ( measure ) => this.orderMeasureIds.includes( measure.id ) )
    },
    orderMeasureNames () {
      return this.orderMeasures.map( ( measure ) => measure.name )
    }
  },
  methods: {
    getButtonType ( measureName ) { return !this.filledMeasures[ measureName ] ? 'brick' : 'safety' },
    emitSectionComplete () {
      if ( !this.checkAllMeasuresFilled() ) {
        this.toast$.warn( { summary: 'Action prevented', detail: 'Fill all forms before go to the next section', life: 5000 } )
        return
      }

      const measureFieldArray = this.getMeasureFieldArray( this.filledMeasures )
      this.mixOrderId( measureFieldArray )

      this.$emit( 'section-complete', {
        sectionName: this.$options.name,
        payload: measureFieldArray
      } )
    },
    checkAllMeasuresFilled () {
      return this.orderMeasureNames.every( ( measureName ) => !!this.filledMeasures[ measureName ] )
    },
    setMeasureData ( measureName, data ) {
      const formattedMeasure = this.formatMeasure( data )

      this.filledMeasures[ measureName ] = formattedMeasure
    },
    formatMeasure ( measure ) {
      const formattedMeasure = []

      for ( const fieldId in measure ) {
        const measureField = measure[ fieldId ]

        formattedMeasure.push( {
          value: measureField.value,
          measureField: measureField.id
        } )
      }

      return formattedMeasure
    },
    getMeasureFieldArray ( measures ) {
      const measureFieldArray = []

      for ( const measureName in measures ) {
        const measure = measures[ measureName ]

        for ( const measureField of measure ) {
          measureFieldArray.push( measureField )
        }
      }

      return measureFieldArray
    },
    mixOrderId ( measureFieldArray ) {
      for ( const measureField of measureFieldArray ) {
        measureField.order = this.orderId
      }
    }
  },
  components: {
    SectionActions,
    zMeasureForm
  }

}
</script>

<style lang="scss">

</style>
