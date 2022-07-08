<template >
  <BackLayout
    prevent-content-extend >
    <router-view />
  </BackLayout>
</template>

<script >
import { rootLayoutMixin } from '@mixins'

import BackLayout from '@layouts/partials/BackLayout/BackLayout.vue'

export default {
  name: 'CheckoutRootLayout',
  components: {
    BackLayout,
  },
  mixins: [ rootLayoutMixin ]
}
</script>

<style lang="scss" scoped >

</style>
