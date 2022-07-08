<template >
  <zDialog
    class="w-11/12 px-9 py-7 sm:w-8/12 md:w-2/4 max-w-sm md:max-w-lg" >
    <template #header >
      <zTabsNav
        v-model="selectedTab"
        :tabs="authTabs"
        indicator-movement >
      </zTabsNav>
    </template>
    <zSpacer space="8" />

    <div class="flex flex-col items-center w-full" >
      <KeepAlive >
        <component :is="currentFormName" />
      </KeepAlive>
    </div>
  </zDialog>
</template>

<script >
import zDialog from '@general_components/composite/zDialog/zDialog.vue'

import LogInForm from './partial/LogInForm/LogInForm.vue'
import SignInForm from './partial/SignInForm/SignInForm.vue'

export default {
  name: 'AuthDialog',
  components: {
    zDialog,
    SignInForm,
    LogInForm
  },
  data () {
    return {
      selectedTab: 'Log In',
      authTabs: [
        'Log In',
        'Sign In'
      ]
    }
  },
  computed: {
    currentFormName () {
      return this.selectedTab.replace( ' ', '' ) + 'Form'
    },
  }
}

</script>

<style lang="scss" scoped >

</style>
