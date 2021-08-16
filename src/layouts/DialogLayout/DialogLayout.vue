<template >
  <component
    v-for="name of shownDialogue"
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
      dialogue: this.dialog$._dialogue
    }
  },
  created () {
    this.registerComponents()
  },
  computed: {
    shownDialogue () {
      return Object.keys( this.dialogue ).filter( ( name ) => this.dialogue[ name ].visible )
    }
  },
  methods: {
    registerComponents () {
      for ( const component of Object.keys( this.$options.components ) ) {
        this.dialog$.register( this.getDialogName( component ) )
      }
    },
    getDialogName ( tag ) {
      return tag.replace( 'The', '' ).replace( 'Dialog', '' ).toLowerCase()
    },
    getComponentName ( dialog ) {
      return 'The' + dialog.capitalize() + 'Dialog'
    },
  },
  components: {
    TheLoginDialog: defineAsyncComponent( () => import( './partial/TheLoginDialog.vue' ) ),
    TheRegistrationDialog: defineAsyncComponent( () => import( './partial/TheRegistrationDialog.vue' ) ),
    TheVerificationDialog: defineAsyncComponent( () => import( './partial/TheVerificationDialog.vue' ) )
  },

}
</script>

<style lang="scss" scoped>

</style>
