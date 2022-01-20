<template >
  <component
    v-for="name of shownDialogs"
    :key="name"
    :is="getComponentName(name)"
    v-model:visible="dialogs[name].visible"
    :modal="dialogs[name].modal" >
  </component>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { stringUtils } from '@js_utils'

export default {
  name: 'DialogLayout',
  inheritAttrs: false,
  data () {
    return {
      dialogs: this.dialog$.getDialogs()
    }
  },
  created () {
    this.registerComponents()
  },
  computed: {
    shownDialogs () {
      return Object.keys( this.dialogs ).filter( ( name ) => this.dialogs[ name ].visible )
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
      return 'The' + stringUtils.capitalize( dialog ) + 'Dialog'
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
