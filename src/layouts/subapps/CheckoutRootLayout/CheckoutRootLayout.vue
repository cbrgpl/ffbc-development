<template >
  <BackLayout
    prevent-content-extend >
    <router-view />
  </BackLayout>
</template>

<script>
import { rootLayoutMixin } from '@mixins'

import BackLayout from '@layouts/partials/BackLayout/BackLayout.vue'

export default {
  name: 'checkout-root-layout',
  mixins: [ rootLayoutMixin ],
  components: {
    BackLayout,
  }
}
</script>

<style lang="scss" scoped>

</style>
