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

import TheMediaViewOverlay from '@/components/composite/TheMediaViewOverlay/TheMediaViewOverlay.vue'

import TheToast from '@components/composite/TheToast/TheToast.vue'

import Console from '@/helpers/classes/Console'

export default {
  name: 'App',
  mounted () {
    this.disableTemplatePreloader()
    this.requestUser()
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
    async disableTemplatePreloader () {
      const isVerificateRoute = !!this.$route.meta.verificateEmail

      if ( isVerificateRoute ) {
        window.addEventListener( 'storage', this.removeTemplateLoader, { once: true } )
      } else {
        this.removeTemplateLoaderWithTimeout( 160 )
      }
    },
    removeTemplateLoaderWithTimeout ( ms ) {
      setTimeout( this.removeTemplateLoader, ms )
    },
    removeTemplateLoader () {
      document.body.removeChild( document.body.querySelector( '#template-preloader' ) )
      document.body.classList.remove( 'body-template-preloader' )
    },
    requestUser () {
      const unwatch = this.$watch(
        'isAuth',
        () => {
          if ( this.$store.getters[ 'auth/isAuth' ] ) {
            this.$store.dispatch( 'user/getUser' )
          }
          unwatch()
        }
      )
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
    isAuth () {
      return this.$store.getters[ 'auth/isAuth' ]
    }
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
