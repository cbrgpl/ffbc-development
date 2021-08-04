<template >
  <div class="absolute" >
    <TheAuthDialog v-model:visible="dialogue.auth" ></TheAuthDialog>

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
    TheAuthDialog: defineAsyncComponent( () => import( './partial/TheAuthDialog.vue' ) ),
  },

}
</script>

<style lang="scss" scoped>

</style>
