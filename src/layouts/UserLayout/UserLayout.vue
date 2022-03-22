<template >
  <div class="flex flex-col" >

    <div
      @click="routerPushBack"
      class="flex items-center w-full py-3 bg-black-primary text-xl select-none" >
      <zIconBase
        class="w-6 mr-2"
        icon="backArrow" />
      Back
    </div>

    <div class="container mx-auto user_padding" >
      <div class="flex text-xl md:text-2xl mb-5 md:mb-9 w-3/4 mx-auto md:mx-0" >
        <zTabRouteNavigation
          class="w-full md:w-auto"
          :tabs="userNavigation" />
      </div>
      <div class="flex-grow" >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import userNavigation from '@enums/nav/userNavigation'
import zTabRouteNavigation from '@/components/composite/zTabRouteNavigation.vue'

export default {
  name: 'user-layout',
  data () {
    return {
      userNavigation,
    }
  },
  created () {
    this.$store.dispatch( 'contacts/getContactTypes' )
  },
  methods: {
    routerPushBack () {
      this.$router.push( { name: 'ShopMain' } )
    }
  },
  components: {
    zTabRouteNavigation
  }
}
</script>

<style lang="scss" scoped>
</style>
