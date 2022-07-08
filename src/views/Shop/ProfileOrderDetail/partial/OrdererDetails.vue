<template >
  <div >
    <zTabsNav
      v-model="activeTab"
      class="w-3/4 max-w-xs mx-auto mb-5"
      :tabs="tabs" />

    <component :is="activeComponentName" />
  </div>
</template>

<script >
import tabs from '@enums/nav/tabs.shopOrderDetails.js'

import OrdererDetailsMeasures from './OrdererDetailsMeasures.vue'
import OrdererDetailsYou from './OrdererDetailsYou.vue'

export default {
  name: 'OrderData',
  components: {
    OrdererDetailsMeasures,
    OrdererDetailsYou
  },
  data () {
    return {
      tabs,
      activeTab: tabs[ 0 ]
    }
  },
  computed: {
    activeComponentName () {
      return 'OrdererDetails' + this.activeTab
    }
  }
}
</script>

<style lang="scss" scoped >

</style>
