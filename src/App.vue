<template >
  <div class="h-screen  bg-black " >
    <component
      class="h-full overflow-y-auto"
      :is="layout" >
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

      if ( this.CONST$.ERROR_HANDLER_STATUSES.some( ( statusesGroup ) => statusesGroup.test( errorObject.error.message ) ) ) {
        this.toast$.error( { summary: 'Server Problems', detail: 'The attempt to connect to the server is successful, but there are some problems with the server. <strong><u>Try again later.</u></strong><br>If you can’t connect, ask for technical support', life: 4000 } )
        return false
      }
    }
  },
  methods: {
    async handleLoading () {
      const isVerificate = location.href.includes( 'verificate' )

      if ( isVerificate ) {
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
