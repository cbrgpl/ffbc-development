<template >
  <div class="py-12 px-4 sm:px-11" >
    <zTabsNav
      class="text-lg sm:text-2xl"
      v-model="selectedTab"
      :tabs="tabs" />

    <zSpacer />
    <zDivider :space="true" />
    <zSpacer :space="8" />

    <div class="w-full flex justify-center" >
      <component :is="componentName" ></component>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'HomeUpdateData',
  data () {
    return {
      tabs: [ 'Personal Data', 'Security', 'Documents' ],
      tabsHashs: {
        'Personal Data': '#PersonalData',
        Security: '#Security',
        Documents: '#Documents'
      },
      selectedTab: 'Personal Data'
    }
  },
  computed: {
    componentName () {
      return this.selectedTab.replace( ' ', '' )
    }
  },
  watch: {
    selectedTab ( newTab ) {
      const url = location.href
      const lastHash = url.lookbehindAlter( '#' )
      history.pushState( {}, null, url.replace( lastHash, '' ) + this.tabsHashs[ newTab ] )
    }
  },
  mounted () {
    this.setPartialByHash()
  },
  methods: {
    setDefaultHash ( defaultTab ) {
      const url = location.href
      const hash = this.tabsHashs[ defaultTab ]
      history.pushState( {}, null, url + hash )
    },
    setPartialByHash () {
      const url = location.href
      const hash = url.lookbehindAlter( '#' )

      if ( hash === '' ) {
        this.setDefaultHash( this.selectedTab )
      }

      const tabs = Object.keys( this.tabsHashs )

      for ( const tab of tabs ) {
        if ( this.tabsHashs[ tab ] === hash ) {
          this.selectedTab = tab
        }
      }
    }
  },
  components: {
    PersonalData: defineAsyncComponent( () => import( './partial/PersonalData.vue' ) ),
    Security: defineAsyncComponent( () => import( './partial/Security.vue' ) ),
    Documents: defineAsyncComponent( () => import( './partial/Documents.vue' ) )
  }
}
</script>

<style>

</style>
