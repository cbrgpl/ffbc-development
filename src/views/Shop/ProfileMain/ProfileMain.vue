<template >
  <div class="flex-col" >
    <UserData
      @click="pushToUserRoute"
      class="shop-main_padding"
      :full-name="$store.getters['user/fullName']" />

    <div class="shop-main_padding" >
      <h4 class="underline mb-5" >
        Profile navigation:
      </h4>
      <ul class="text-xl" >
        <li
          class="border-b border-solid border-placeholder border-opacity-75 py-3.5 mb-2.5"
          v-for="navigation of profileNavigation"
          :key="navigation.toRouteName" >
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

<script>
import profileNavigation from '@enums/nav/router.shopProfile'

import UserData from './partial/UserData.vue'

export default {
  name: 'ProfileMain',
  data () {
    return {
      profileNavigation
    }
  },
  methods: {
    pushToUserRoute () {
      this.$router.push( { name: 'UserMe' } )
    }
  },
  components: {
    UserData,
  }
}
</script>

<style lang="scss" scoped>

</style>
