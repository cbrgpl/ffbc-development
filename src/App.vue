<template >
  <div >
    <component :is="layout" >
      <router-view />
    </component>
  </div>
</template>

<script>
import LayoutMain from '@layouts/LayoutMain/LayoutMain.vue'
import LayoutEmpty from '@layouts/LayoutEmpty/LayoutEmpty.vue'

export default {
  name: 'App',
  components: {
    LayoutMain,
    LayoutEmpty
  },
  computed: {
    layout () {
      return 'layout-' + this.$route.meta.layout
    }
  },
}
</script>

<style lang="scss">

</style>
