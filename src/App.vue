<template >
  <div class="h-screen  bg-black text-white" >
    <component
      class="h-full overflow-y-auto"
      :is="layout"
      :hidden-elems="hiddenElements" >
      <router-view />
    </component>

    <TheToast />
    <DialogLayout />
  </div>
</template>

<script>
import MainLayout from '@layouts/MainLayout/MainLayout.vue'
import EmptyLayout from '@layouts/EmptyLayout/EmptyLayout.vue'
import DialogLayout from '@layouts/DialogLayout/DialogLayout.vue'
import ShopLayout from '@layouts/ShopLayout/ShopLayout.vue'

import TheToast from '@components/composite/TheToast/TheToast.vue'

import consoleLogger from '@classes/consoleLogger.class'

export default {
  name: 'App',
  async mounted () {
    this.handleLoading()
    this.$store.commit( 'clearModules' )
  },
  data () {
    return {
      errorsNumber: 0,
    }
  },
  errorCaptured ( error, vnode, info ) {
    if ( !error.useHook ) {
      console.group( `Not hookable error number ${ this.errorsNumber++ }` )
      consoleLogger.object( info, 'info: ' )
      consoleLogger.object( error, 'error: ' )
      consoleLogger.object( vnode, 'vnode: ' )
      console.groupEnd()

      throw error
    }

    error.onErrorHook( error )
    return false
  },
  methods: {
    async handleLoading () {
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
      return this.$route.meta.layout + '-layout'
    },
    hiddenElements () {
      return this.$route.meta.hiddenElems ? this.$route.meta.hiddenElems : []
    }
  },
  components: {
    MainLayout,
    EmptyLayout,
    DialogLayout,
    ShopLayout,
    TheToast,
  },
}
</script>

<style lang="scss">

</style>
