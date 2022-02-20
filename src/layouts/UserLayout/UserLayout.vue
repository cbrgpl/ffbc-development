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

    <div class="px-4 pt-5 md:px-6" >
      <div class="flex text-xl mb-5 w-3/4 mx-auto" >
        <zTabRouteNavigation
          class="w-full"
          :initial-value="userNavigation[0]"
          :tabs="userNavigation" >
          <template
            v-slot="{ tab }" >
            <router-link
              :to="{name: tab.toRouteName}" >
              {{ tab.name }}
            </router-link>
          </template>
        </zTabRouteNavigation>
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
