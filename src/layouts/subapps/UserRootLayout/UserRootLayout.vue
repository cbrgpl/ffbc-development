<template >
  <BackLayout
    prevent-content-extend >
    <div class="container mx-auto user_padding" >
      <UserNavigation class="mb-5 md:mb-9 w-3/4 mx-auto md:mx-0" />

      <div class="flex-grow" >
        <router-view />
      </div>
    </div>
  </BackLayout>

</template>

<script>

import { rootLayoutMixin } from '@mixins'

import BackLayout from '@layouts/partials/BackLayout/BackLayout.vue'
import UserNavigation from './partial/UserNavigation.vue'

export default {
  name: 'user-root-layout',
  mixins: [ rootLayoutMixin ],
  components: {
    BackLayout,
    UserNavigation
  }
}
</script>

<style lang="scss" scoped>
</style>
