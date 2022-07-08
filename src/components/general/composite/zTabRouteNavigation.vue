<template >
  <zTabNav
    v-model="modelValue"
    :tabs="tabs" >
    <template #default="{tab}" >
      <slot :tab="tab" >
        <router-link
          :to="{name: tab.toRouteName}" >
          {{ tab.name }}
        </router-link>
      </slot>
    </template>
  </zTabNav>
</template>

<script >
import zTabNav from '@/components/general/atomic/zTabNav.vue'

export default {
  name: 'ZTabRouteNavigation',

  components: {
    zTabNav
  },
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
  created () {
    this.modelValue = this.currentTab
  },
  methods: {
    tabRouteIsMatched ( tab ) {
      const matchedRouteIsTabRoute = ( matchedRoute ) => matchedRoute.name === tab.toRouteName
      return this.matchedRoutes.some( matchedRouteIsTabRoute )
    },
  }
}
</script>

<style lang="scss" scoped >

</style>
