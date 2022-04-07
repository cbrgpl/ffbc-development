<template >
  <component
    v-for="name of shownDialogs"
    :key="name"
    :is="getComponentName(name)"
    @close="dialog$.close( $event )"
    :remove-buffer="removeBuffer"
    :name="name"
    :visible="true"
    :modal="dialogs[name].modal"
    v-bind="param" >
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
      dialogs: this.dialog$.getDialogs(),
      removeBuffer: this.dialog$.getRemoveBuffer(),
      param: this.dialog$.getDialogParam()
    }
  },
  created () {
    this.registerComponents()
    this.startListenEscKeyup()
  },
  computed: {
    shownDialogs () {
      return Object.keys( this.dialogs ).filter( ( name ) => this.dialogs[ name ].visible )
    },
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
    startListenEscKeyup () {
      const hideLastDialog = () => {
        const shownDialogsLength = this.shownDialogs.length

        if ( shownDialogsLength === 0 ) {
          return
        }

        const lastDialogName = this.shownDialogs[ shownDialogsLength - 1 ]

        this.dialog$.hide( lastDialogName )
      }

      window.addEventListener( 'keydown', ( event ) => {
        if ( event.key === 'Escape' ) {
          hideLastDialog()
        }
      } )
    },
  },
  components: {
    TheVerificationDialog: defineAsyncComponent( () => import( './partial/TheVerificationDialog.vue' ) ),
    TheResetPasswordDialog: defineAsyncComponent( () => import( './partial/TheResetPasswordDialog.vue' ) ),
    TheAuthDialog: defineAsyncComponent( () => import( './partial/TheAuthDialog/TheAuthDialog.vue' ) ),
    TheAddToCartDialog: defineAsyncComponent( () => import( './partial/TheAddToCartDialog/TheAddToCartDialog.vue' ) )

  },

}
</script>

<style lang="scss" scoped>

</style>
