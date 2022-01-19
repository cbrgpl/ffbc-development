<template >
  <component
    v-for="name of shownDialog"
    :key="name"
    :is="getComponentName(name)"
    v-model:visible="dialogue[name].visible"
    :modal="dialogue[name].modal" >
  </component>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'DialogLayout',
  inheritAttrs: false,
  data () {
    return {
      dialog: this.dialog$._dialogue
    }
  },
  created () {
    this.registerComponents()
  },
  computed: {
    shownDialog () {
      return Object.keys( this.dialog ).filter( ( name ) => this.dialog[ name ].visible )
    }
  },
  methods: {
    registerComponents () {
      for ( const componentName of Object.keys( this.$options.components ) ) {
        this.dialog$.register( this.getDialogName( componentName ) )
      }
    },
    getDialogName ( componentName ) {
      const dialogName = componentName.replace( 'The', '' ).replace( 'Dialog', '' )
      return dialogName[ 0 ].toLowerCase() + dialogName.slice( 1 )
    },
    getComponentName ( dialog ) {
      return 'The' + dialog.capitalize() + 'Dialog'
    },
  },
  components: {
    TheLoginDialog: defineAsyncComponent( () => import( './partial/TheLoginDialog.vue' ) ),
    TheRegistrationDialog: defineAsyncComponent( () => import( './partial/TheRegistrationDialog.vue' ) ),
    TheVerificationDialog: defineAsyncComponent( () => import( './partial/TheVerificationDialog.vue' ) ),
    TheResetPasswordDialog: defineAsyncComponent( () => import( './partial/TheResetPasswordDialog.vue' ) ),
  },

}
</script>

<style lang="scss" scoped>

</style>
