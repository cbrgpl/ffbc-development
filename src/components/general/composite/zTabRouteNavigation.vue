<template >
  <zTabNav
    :tabs="tabs"
    v-model="modelValue" >
    <template v-slot="{tab}" >
      <slot :tab="tab" >
        <router-link
          :to="{name: tab.toRouteName}" >
          {{ tab.name }}
        </router-link>
      </slot>
    </template>
  </zTabNav>
</template>

<script>
import zTabNav from '@/components/general/atomic/zTabNav.vue'

export default {
  name: 'zTabRouteNavigation',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      modelValue: this.initialValue,
    }
  },
  created () {
    this.modelValue = this.currentTab
  },
  computed: {
    matchedRoutes () {
      return this.$route.matched
    },
    currentTab () {
      for ( const tab of this.tabs ) {
        if ( this.tabRouteIsMatched( tab ) ) {
          return tab
        }
      }

      return null
    }
  },
  methods: {
    tabRouteIsMatched ( tab ) {
      const matchedRouteIsTabRoute = ( matchedRoute ) => matchedRoute.name === tab.toRouteName
      return this.matchedRoutes.some( matchedRouteIsTabRoute )
    },
  },

  components: {
    zTabNav
  }
}
</script>

<style lang="scss" scoped>

</style>
