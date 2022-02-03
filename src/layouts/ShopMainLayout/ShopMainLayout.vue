<template >
  <div
    class="flex flex-col items-stretch overflow-x-hidden" >
    <TheHeader
      @toggle-sidebar-visibility="sidebarVisiblity = !sidebarVisiblity"
      v-if="!hidden['TheHeader']" />
    <div class="relative flex flex-grow items-stretch lg:flex-row overflow-hidden max-w-full"  >
      <TheSidemenu
        :visible="sidebarVisiblity"
        v-if="!hidden['TheSidemenu']" />
      <router-view class="flex-grow flex flex-col overflow-y-auto" />
    </div>
  </div>
</template>

<script>
import TheHeader from './partial/TheHeader.vue'
import TheSidemenu from './partial/TheSidemenu.vue'

import { baseLayoutMix } from '@mixins'

export default {
  name: 'shop-main-layout',
  mixins: [ baseLayoutMix ],
  data () {
    return {
      sidebarVisiblity: false,
    }
  },
  computed: {
    currentRoute () {
      return this.$route
    }
  },
  watch: {
    currentRoute () {
      this.sidebarVisiblity = false
    }
  },
  components: {
    TheHeader,
    TheSidemenu
  },
}
</script>

<style lang="scss" scoped>

</style>
