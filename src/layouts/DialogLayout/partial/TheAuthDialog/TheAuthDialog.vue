<template >
  <zDialog class="w-11/12 sm:w-8/12 md:w-2/4 max-w-sm" >
    <template #header >
      <zTabsNav
        v-model="selectedTab"
        :tabs="authTabs"
        indicator-movement >

      </zTabsNav>
    </template>
    <zSpacer space="8" ></zSpacer>

    <div class="flex flex-col items-center w-full" >

    </div>
  </zDialog>
</template>

<script>
import zDialog from '@components/composite/zDialog/zDialog.vue'

export default {
  name: 'auth-dialog',
  data () {
    return {
      selectedTab: 'Log In',
      authTabs: [
        'Log In',
        'Sign In'
      ]
    }
  },
  methods: {
  },
  components: {
    zDialog,
  }
}

</script>

<style lang="scss" scoped>

</style>
