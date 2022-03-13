<template >
  <zDialog class="w-11/12 sm:w-8/12 md:w-2/4 max-w-md" >
    <template #header >
      <h4 >Select feature values:</h4>
    </template>

    <FeatureSection
      class="mb-3 last:mb-6"
      @setFeatureValue="putFeatureValue"
      v-for="feature of productFeatures"
      :key="feature.id"
      :section-valid="features[feature.name].valid"
      v-bind="feature" />

    <template #footer >
      <zLoaderButton
        class="w-full md:w-auto px-16 py-3.5 float-right"
        :loader="buttonLoading"
        @click="createCartItem" >
        Add
      </zLoaderButton>
    </template>
  </zDialog>
</template>

<script>
import zDialog from '@components/composite/zDialog/zDialog.vue'
import FeatureSection from './partial/FeatureSection.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'AddToCartDialog',
  props: {
    product: {
      type: Object,
    },
  },
  data () {
    return {
      features: {},
      buttonLoading: false,
    }
  },
  beforeMount () {
    this.initFeatureValues()
  },
  computed: {
    ...mapGetters( {
      getFeaturesForProduct: 'product/getFeaturesForProduct',
    } ),
    productFeatures () {
      return this.getFeaturesForProduct( this.product )
    },
  },
  methods: {
    initFeatureValues () {
      for ( const feature of this.productFeatures ) {
        this.features[ feature.name ] = {
          field: null,
          valid: true,
        }
      }
    },
    putFeatureValue ( featureName, featureValue ) {
      this.features[ featureName ].field = featureValue
    },
    async createCartItem () {
      if ( !this.featureFieldsValid() ) {
        return
      }

      const featureFields = this.getSelectedFeatureFields()

      const cartItem = {
        product: this.product.id,
        featureFields
      }

      const creatingSuccess = await this.$store.dispatch( 'cart/createCartItem', cartItem )

      if ( creatingSuccess ) {
        this.toast$.success( { summary: 'Product was successfuly added to cart' } )
        this.dialog$.hide( 'addToCart' )
      }
    },
    featureFieldsValid () {
      this.clearFeatureErrors()

      const validationOfFeatures = this.isFeatureFieldsValid()
      if ( !validationOfFeatures.valid ) {
        this.makeFeatureErrored( validationOfFeatures.featureNames )
        return false
      }

      return true
    },
    clearFeatureErrors ( ) {
      for ( const featureName in this.features ) {
        this.features[ featureName ].valid = true
      }
    },
    makeFeatureErrored ( featureNames ) {
      for ( const name of featureNames ) {
        this.features[ name ].valid = false
      }
    },
    getSelectedFeatureFields () {
      return Object.entries( this.features ).map( ( feature ) => feature[ 1 ].field )
    },
    isFeatureFieldsValid () {
      const validationResult = {
        valid: true,
        featureNames: [],
      }

      for ( const featureName in this.features ) {
        if ( this.features[ featureName ].field === null ) {
          validationResult.valid = false
          validationResult.featureNames.push( featureName )
        }
      }

      return validationResult
    }
  },
  components: {
    zDialog,
    FeatureSection
  },
}
</script>

<style lang="scss" scoped>
</style>
