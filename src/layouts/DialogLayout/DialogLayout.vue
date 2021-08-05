<template >
  <div class="absolute" >
    <TheLoginDialog v-model:visible="dialogue.login" />
    <TheRegistrationDialog v-model:visible="dialogue.registration" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'DialogLayout',
  data () {
    return {
      dialogue: this.dialog$._dialogue
    }
  },
  created () {
    this.registerComponents()
  },
  methods: {
    registerComponents () {
      for ( const component of Object.keys( this.$options.components ) ) {
        this.dialog$.register( this.getDialogName( component ) )
      }
    },
    getDialogName ( tag ) {
      return tag.replace( 'The', '' ).replace( 'Dialog', '' ).toLowerCase()
    }
  },
  components: {
    TheLoginDialog: defineAsyncComponent( () => import( './partial/TheLoginDialog.vue' ) ),
    TheRegistrationDialog: defineAsyncComponent( () => import( './partial/TheRegistrationDialog.vue' ) )
  },

}
</script>

<style lang="scss" scoped>

</style>
