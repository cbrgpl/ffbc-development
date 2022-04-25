<template >
  <section class="px-3 py-4" >
    <Navigation
      class="mb-4 max-w-md md:max-w-lg mx-auto"
      v-model="currentSectionIndex"
      :checkout-navigation="checkoutNavigation" />

    <component
      class="container mx-auto"
      @section-complete="sendSectionData"
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

export default {
  name: 'Checkout',
  data () {
    return {
      checkoutNavigation,
      currentSectionIndex: 0,
    }
  },
  provide () {
    return {
      actionsDisabled: computed( () => this.currentSectionIndex === this.checkoutNavigation.tabs.length - 1 )
    }
  },
  computed: {
    sectionKeyword () {
      return this.checkoutNavigation.tabs[ this.currentSectionIndex ].keyword
    },
    sectionName () {
      return this.sectionKeyword.slice( 0, 1 ).toUpperCase() + this.sectionKeyword.slice( 1 )
    }
  },
  methods: {
    sendSectionData ( data ) {
      console.log( data )
      this.changeSection()
    },
    changeSection () {
      if ( this.currentSectionIndex < this.checkoutNavigation.tabs.length - 1 ) {
        this.currentSectionIndex++
      }
    }
  },
  components: {
    Navigation,
    BasicInformation
  }
}
</script>
