<template >
  <div >
    <zTabsNav
      class="w-3/4 max-w-xs mx-auto mb-5"
      v-model="activeSection"
      :tabs="userDetailSections" />

    <component :is="activeComponentName" />
  </div>
</template>

<script>
import userDetailSections from '@enums/nav/userDetailSections'

import OrdererDetailsMeasures from './OrdererDetailsMeasures.vue'
import OrdererDetailsYou from './OrdererDetailsYou.vue'

export default {
  name: 'OrderData',
  data () {
    return {
      userDetailSections,
      activeSection: userDetailSections[ 0 ]
    }
  },
  computed: {
    activeComponentName () {
      return 'OrdererDetails' + this.activeSection
    }
  },
  components: {
    OrdererDetailsMeasures,
    OrdererDetailsYou
  }
}
</script>

<style lang="scss" scoped>

</style>
