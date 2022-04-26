<template >
  <section class="px-3 py-4" >
    <Navigation
      class="mb-4 max-w-md md:max-w-lg mx-auto"
      v-model="currentSectionIndex"
      :checkout-navigation="checkoutNavigation" />

    <component
      class="container mx-auto"
      @section-complete="sendSectionData"
      :binded-cart-items="bindedCartItems"
      :is="sectionName" >

      <template #actions >
        <zButton >
          change
        </zButton>
      </template>
    </component>

  </section>
</template>

<script>
import { computed } from 'vue'
import checkoutNavigation from '@enums/info/navigation.checkout.js'

import Navigation from './partial/Navigation.vue'

import BasicInformation from './partial/BasicInformation.vue'
import Measures from './partial/Measures.vue'

import CheckoutStrategy from '@classes/checkoutStrategy'
import CheckoutStrategySpecialCase from '@classes/checkoutStrategy'

const strategiesMap = new Map( [
  [ 'BasicInformation', {
    constructorArgs: [ '12354' ],
    Strategy: CheckoutStrategy
  } ],
  [ 'Measures', {
    constructorArgs: [ '56678' ],
    Strategy: CheckoutStrategySpecialCase
  } ],
] )

export default {
  name: 'Checkout',
  props: {
    bindedCartItemIds: {
      type: Array,
      required: true,
    }
  },
  data () {
    return {
      checkoutNavigation,
      currentSectionIndex: 0,
      strategiesMap,
      activeStrategy: null,
      actionsLoader: false
    }
  },
  provide () {
    return {
      actionsDisabled: computed( () => this.currentSectionIndex === this.checkoutNavigation.tabs.length - 1 ),
      actionsLoader: computed( () => this.actionsLoader )
    }
  },
  computed: {
    sectionKeyword () {
      return this.checkoutNavigation.tabs[ this.currentSectionIndex ].keyword
    },
    sectionName () {
      return this.sectionKeyword.slice( 0, 1 ).toUpperCase() + this.sectionKeyword.slice( 1 )
    },
    bindedCartItems () {
      return this.$store.getters[ 'cart/bindedCartItems' ].filter( ( bindedCartItem ) => this.bindedCartItemIds.includes( bindedCartItem.cartItem.id ) )
    },
  },
  methods: {
    async sendSectionData ( data ) {
      this.actionsLoader = true
      this.setStrategy( data.sectionName )

      await this.activeStrategy.sendData( data.payload )

      this.changeSection()
      this.actionsLoader = false
    },
    changeSection () {
      if ( this.currentSectionIndex < this.checkoutNavigation.tabs.length - 1 ) {
        this.currentSectionIndex++
      }
    },
    setStrategy ( sectionName ) {
      const { constructorArgs, Strategy } = this.strategiesMap.get( sectionName )

      this.activeStrategy = new Strategy( constructorArgs )
    }
  },
  components: {
    Navigation,

    BasicInformation,
    Measures
  }
}
</script>
