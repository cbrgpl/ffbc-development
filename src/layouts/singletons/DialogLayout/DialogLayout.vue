<template >
  <component
    :is="getComponentName(name)"
    v-for="name of shownDialogs"
    :key="name"
    :remove-buffer="removeBuffer"
    :name="name"
    :visible="true"
    :modal="dialogs[name].modal"
    v-bind="param"
    @close="dialog$.close( $event )" >
  </component>
</template>

<script >
import { defineAsyncComponent } from 'vue'
import { stringUtils } from '@js_utils'
import escCloseMix from '@mixins/escClose.mixin'

export default {
  name: 'DialogLayout',
  components: {
    TheVerificationDialog: defineAsyncComponent( () => import( './partial/TheVerificationDialog.vue' ) ),
    TheResetPasswordDialog: defineAsyncComponent( () => import( './partial/TheResetPasswordDialog.vue' ) ),
    TheAuthDialog: defineAsyncComponent( () => import( './partial/TheAuthDialog/TheAuthDialog.vue' ) ),
    TheAddToCartDialog: defineAsyncComponent( () => import( './partial/TheAddToCartDialog/TheAddToCartDialog.vue' ) )
  },
  mixins: [ escCloseMix ],
  inheritAttrs: false,
  data () {
    return {
      dialogs: this.dialog$.getDialogs(),
      removeBuffer: this.dialog$.getRemoveBuffer(),
      param: this.dialog$.getDialogParam()
    }
  },
  computed: {
    shownDialogs () {
      return Object.keys( this.dialogs ).filter( ( name ) => this.dialogs[ name ].visible )
    },
  },
  created () {
    this.registerComponents()
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
    closeFn () {
      const shownDialogsLength = this.shownDialogs.length

      const lastDialogName = this.shownDialogs[ shownDialogsLength - 1 ]

      this.dialog$.hide( lastDialogName )
    },
    getCallCondition () {
      return this.shownDialogs.length !== 0
    }
  },


}
</script>

<style lang="scss" scoped >

</style>
