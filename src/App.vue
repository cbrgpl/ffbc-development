<template >
  <div class="h-screen bg-black " >
    <!-- TODO Нужно реализовать лоадер в template.html, присвоить ему ID и когда убирать тогда, когда закнчат рендериться все вью компоненты -->
    <component
      class="h-full overflow-y-auto"
      :is="layout" >
      <router-view />
    </component>
  </div>
</template>

<script>
import MainLayout from '@layouts/MainLayout/MainLayout.vue'
import EmptyLayout from '@layouts/EmptyLayout/EmptyLayout.vue'

export default {
  name: 'App',
  components: {
    MainLayout,
    EmptyLayout
  },
  computed: {
    layout () {
      return this.$route.meta.layout + '-layout'
    }
  },
}
</script>

<style lang="scss">

</style>
