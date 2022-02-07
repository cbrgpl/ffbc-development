<template >
  <div class="h-screen  bg-black text-white" >
    <component
      class="h-full overflow-y-auto"
      :is="layout"
      :hidden-elems="hiddenElements" >
      <router-view />
    </component>

    <TheToast />
    <TheMediaViewOverlay />
    <DialogLayout />
  </div>
</template>

<script>
import MainLayout from '@layouts/MainLayout/MainLayout.vue'
import EmptyLayout from '@layouts/EmptyLayout/EmptyLayout.vue'
import DialogLayout from '@layouts/DialogLayout/DialogLayout.vue'
import ShopMainLayout from '@layouts/ShopMainLayout/ShopMainLayout.vue'

import TheMediaViewOverlay from '@components/composite/TheMediaViewOverlay.vue'

import TheToast from '@components/composite/TheToast/TheToast.vue'

import Console from '@/helpers/classes/Console'

export default {
  name: 'App',
  async mounted () {
    this.onAppInit()
  },
  data () {
    return {
      errorsNumber: 0,
    }
  },

  errorCaptured ( error, vnode, info ) {
    if ( !error.onErrorCallback ) {
      console.group( `Not hookable error number ${ this.errorsNumber++ }` )
      Console.object( info, 'info: ' )
      Console.object( vnode, 'vnode: ' )

      for ( const prop in error ) {
        console.error( prop, error[ prop ] )
      }

      console.groupEnd()

      throw error
    }

    return error.onErrorHook( error )
  },
  methods: {
    async onAppInit () {
      const isVerificateRoute = location.href.includes( 'verificate' )

      if ( isVerificateRoute ) {
        window.addEventListener( 'storage', this.removeTemplateLoader(), { once: true } )
      } else {
        setTimeout( () => {
          setTimeout( () => {
            this.removeTemplateLoader()
          }, 0 )
        }, 35 )
      }
    },
    removeTemplateLoader () {
      document.body.removeChild( document.body.querySelector( '#template-preloader' ) )
      document.body.classList.remove( 'body-template-preloader' )
    }
  },
  computed: {
    layout () {
      const currentLayoutName = this.$route.meta.layout || 'empty'
      return currentLayoutName + '-layout'
    },
    hiddenElements () {
      return this.$route.meta.hiddenElems ? this.$route.meta.hiddenElems : []
    },
  },
  components: {
    MainLayout,
    EmptyLayout,
    DialogLayout,
    ShopMainLayout,
    TheMediaViewOverlay,
    TheToast,
  },
}
</script>

<style lang="scss">

</style>
