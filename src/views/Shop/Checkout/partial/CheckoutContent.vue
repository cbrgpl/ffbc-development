<template >
  <section class="px-3 py-4" >
    <Navigation
      v-model="currentSectionIndex"
      class="mb-4 max-w-md md:max-w-lg mx-auto"
      :checkout-navigation="$options.checkoutNavigation" />

    <component
      :is="sectionName"
      ref="section"
      class="container mx-auto"
      :binded-cart-items="bindedCartItems"
      @sectionCompleted="emitSectionCompleted" />
  </section>

  <SectionActions
    :loading="actionsLoading"
    @pressed="completeSection" >
    {{ sectionIsLast ? 'Finish' : 'Next' }}
  </SectionActions>
</template>

<script >
import { checkoutNavigation } from '@enums/nav/tabs.shopCheckout.js'

import Navigation from './Navigation.vue'
import SectionActions from './SectionActions.vue'

import BasicInformation from './BasicInformation.vue'
import Measures from './Measures.vue'

export default {
  name: 'CheckoutContent',
  expose: [ 'setNextSection', 'setLoadingState' ],
  components: {
    Navigation,
    SectionActions,

    BasicInformation,
    Measures
  },
  props: {
    bindedCartItems: {
      type: Array,
      required: true,
    },
  },
  emits: [ 'lastSectionCompleted', 'sectionCompleted' ],
  checkoutNavigation,
  data() {
    return {
      currentSectionIndex: 0,
      actionsLoading: false
    }
  },
  computed: {
    sectionName () {
      return this.sectionKeyword.slice( 0, 1 ).toUpperCase() + this.sectionKeyword.slice( 1 )
    },
    sectionKeyword () {
      return this.$options.checkoutNavigation.tabs[ this.currentSectionIndex ].keyword
    },
    sectionIsLast() {
      return this.currentSectionIndex === this.$options.checkoutNavigation.tabs.length - 1
    }
  },
  methods: {
    // Public
    setNextSection() {
      this.changeSection( this.currentSectionIndex + 1 )
    },
    setLoadingState( state ) {
      this.actionsLoading = state
    },


    // Private
    changeSection ( index ) {
      if ( this.currentSectionIndex < this.$options.checkoutNavigation.tabs.length - 1 ) {
        this.currentSectionIndex = index
      }
    },
    completeSection() {
      const section = this.$refs.section

      section.completeSection()
    },
    emitSectionCompleted( collectedData ) {
      const emitPayload = {
        payload: collectedData,
        sectionKeyword: this.sectionKeyword
      }

      this.$emit( 'sectionCompleted', emitPayload )

      if( this.sectionIsLast ) {
        this.startWatchCheckoutProcessEnding()
      }
    },
    startWatchCheckoutProcessEnding() {
      this.$watch(
        () => this.actionsLoading,
        () => {
          this.$emit( 'lastSectionCompleted' )
        },
      )
    }
  },
}
</script>

<style lang="scss" scoped >

</style>