<template >
  <div class="h-screen  bg-black " >
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
import TheToast from '@components/composite/TheToast/TheToast.vue'

export default {
  name: 'App',
  mounted () {
    this.handleLoading()
  },
  data () {
    return {
      errorsNumber: 0,
    }
  },

  errorCaptured ( errorObject, vnode, info ) {
    if ( errorObject.error ) {
      console.group( `Error number ${ this.errorsNumber++ }` )
      this.log$.error( errorObject.error.message, 'Error with message//was captured' )
      this.log$.object( info, 'info: ' )
      this.log$.object( errorObject, 'errorObject: ' )
      this.log$.object( vnode, 'vnode: ' )
      console.groupEnd()

      if ( /429/.test( errorObject.error.message ) ) {
        this.toast$.warn( { summary: 'Too many server requests', detail: 'You send requests to the server too often.</br><strong>Please wait a while and try again.</strong>' } )
      } else if ( this.CONST$.ERROR_HANDLER_STATUSES.some( ( statusesGroup ) => statusesGroup.test( errorObject.error.message ) ) ) {
        this.toast$.error( { summary: 'Server Problems', detail: 'The attempt to connect to the server is successful, but there are some problems with the server. <strong><u>Try again later.</u></strong><br>If you can’t connect, ask for technical support', life: 8000 } )
      } else {
        this.toast$.error( { summary: 'Site problem', detail: 'A problem occurred during the operation of the site. We are already in the process of solving it', life: 8000 } )
      }

      return false
    }
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
    TheToast,
  },
}
</script>

<style lang="scss">

</style>
