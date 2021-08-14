<template >
  <div class="h-screen bg-black " >
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
    this.removeTemplatePreloader()
    this.toast$.warn( { summary: 'Заголовок', detail: ' wqeqe qwe q qweqe qweq qeq eqwqwe qwe ewqe qwe wqeqwe qweqw eqw ewqeqw qweqweq eqweqweqweqeqeqeqweqeqweqeqe qweq eqw eqwe qwe qw qeqweqwe qweq wq eqw qw' } )
  },
  methods: {
    async removeTemplatePreloader () {
      setTimeout( () => {
        setTimeout( () => {
          document.body.removeChild( document.body.querySelector( '#template-preloader' ) )
          document.body.classList.remove( 'body-template-preloader' )
        }, 0 )
      }, 35 )
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
