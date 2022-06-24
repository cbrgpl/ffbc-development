<template >
  <div class="h-screen  bg-black text-white" >

    <router-view v-slot="{Component}" >
      <component
        class="layout-content flex-col"
        :is="Component" >
        <router-view
          class="layout-content"
          id="sub-app-root" ></router-view>
      </component>
    </router-view>

    <div
      v-if="appInitialized && !subAppLoaded"
      class="fixed w-screen h-screen top-0 left-0 z-140" >
      <zLoader
        size="180px"
        background
        title />
    </div>

    <TheToast />
    <TheMediaViewOverlay />
    <DialogLayout />
  </div>
</template>

<script>
import DialogLayout from '@layouts/singletons/DialogLayout/DialogLayout.vue'

import TheMediaViewOverlay from '@general_components/singletons/TheMediaViewOverlay/TheMediaViewOverlay.vue'
import TheToast from '@general_components/singletons/TheToast/TheToast.vue'

import Console from '@/helpers/classes/Console'

export default {
  name: 'App',
  created () {
    this.startWatchAppInitStatus()
    this.$store.dispatch( 'app/initWindowEscListener' )
  },
  computed: {
    appInitialized () {
      return this.$store.getters[ 'app/appInitialized' ]
    },
    subAppLoaded () {
      return this.$store.getters[ 'app/subAppLoaded' ]
    }
  },
  data () {
    return {
      errorsNumber: 0,
    }
  },
  errorCaptured ( error, vnode, info ) {
    for ( const prop in error ) {
      console.error( prop, error[ prop ] )
    }

    if ( !error.onErrorCallback ) {
      console.group( `Not hookable error number ${ this.errorsNumber++ }` )
      Console.object( info, 'info: ' )
      Console.object( vnode, 'vnode: ' )

      console.groupEnd()

      throw error
    }

    return error.onErrorHook( error )
  },
  methods: {
    startWatchAppInitStatus () {
      const unwatch = this.$watch(
        () => this.appInitialized && this.subAppLoaded,
        ( newVal ) => {
          if ( newVal ) {
            this.removeTemplateLoader()
            unwatch()
          }
        },
        {
          flush: 'post'
        }
      )
    },
    removeTemplateLoader () {
      document.body.removeChild( document.body.querySelector( '#template-preloader' ) )
      document.body.classList.remove( 'body-template-preloader' )
    },
  },

  components: {
    DialogLayout,
    TheMediaViewOverlay,
    TheToast,
  },
}
</script>

<style lang="scss">

</style>
