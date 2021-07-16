<template >
  <div class="h-screen bg-black " >
    <component
      class="h-full overflow-y-auto px-4"
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
