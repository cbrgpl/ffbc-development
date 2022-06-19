<template >
  <div >
    <zTabsNav
      class="w-3/4 max-w-xs mx-auto mb-5"
      v-model="activeTab"
      :tabs="tabs" />

    <component :is="activeComponentName" />
  </div>
</template>

<script>
import tabs from '@enums/nav/tabs.shopOrderDetails.js'

import OrdererDetailsMeasures from './OrdererDetailsMeasures.vue'
import OrdererDetailsYou from './OrdererDetailsYou.vue'

export default {
  name: 'OrderData',
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
  },
  components: {
    OrdererDetailsMeasures,
    OrdererDetailsYou
  }
}
</script>

<style lang="scss" scoped>

</style>
