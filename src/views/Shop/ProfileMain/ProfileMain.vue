<template >
  <div class="flex-col" >
    <UserData
      class="shop-main-padding"
      :full-name="$store.getters['user/fullName']"
      @click="pushToUserRoute" />

    <div class="shop-main-padding" >
      <h4 class="underline mb-5" >
        Profile navigation:
      </h4>
      <ul class="text-xl" >
        <li
          v-for="navigation of profileNavigation"
          :key="navigation.toRouteName"
          class="border-b border-solid border-placeholder border-opacity-75 py-3.5 mb-2.5" >
          <router-link
            class="flex items-center"
            :to="{name: navigation.toRouteName}" >
            <zIconBase
              class="w-6 mr-2.5"
              :icon="navigation.iconName" />
            {{ navigation.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script >
import profileNavigation from '@enums/nav/router.shopProfile'

import UserData from './partial/UserData.vue'

export default {
  name: 'ProfileMain',
  components: {
    UserData,
  },
  data () {
    return {
      profileNavigation
    }
  },
  methods: {
    pushToUserRoute () {
      this.$router.push( { name: 'UserMe' } )
    }
  }
}
</script>

<style lang="scss" scoped >

</style>
