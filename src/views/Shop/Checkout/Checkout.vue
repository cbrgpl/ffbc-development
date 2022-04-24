<template >
  <section class="px-3">
    <Navigation class="mt-2 mb-4" v-model="currentSectionIndex" :checkoutNavigation="checkoutNavigation"/>

    <zButton @click="changeSection">change</zButton>
    {{ currentSectionIndex }}
  </section>
</template>

<script>
import Navigation from './partial/Navigation'

import checkoutNavigation from '@enums/info/navigation.checkout.js'

export default {
  name: 'Checkout',
  data() {
    return {
      checkoutNavigation,
        currentSectionIndex: 0,
      }
  },
  methods: {
changeSection() {
  if(this.currentSectionIndex < this.checkoutNavigation.tabs.length - 1) {
    this.currentSectionIndex++
  }
}
  },
  components: {
    Navigation
  }
}
</script>
