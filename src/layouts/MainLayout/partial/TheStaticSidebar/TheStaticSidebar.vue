<template >
  <aside class="w-16 xl:w-20 relative flex flex-col bg-black-lighten pt-10 pb-6" >
    <ul
      class="flex flex-col flex-grow w-full"
      type="none" >
      <router-link
        class="static-sidebar__nav mb-6 px-3 py-1"
        v-for="option of siteNav"
        :key="option.name"
        :to="{name: option.name}"
        exact-active-class="static-sidebar__nav--selected"
        v-tooltip.right.1="option.label" >

        <zIconBase
          class="m-auto"
          width="40"
          height="40"
          :icon="option.iconName" />
      </router-link>
    </ul>

    <UserNavigation :visible="isUserNavigationVisible" />

    <span
      v-if="isAuth"
      class="m-auto relative"
      v-tooltip.right="'Open user navigation'" >

      <zIconBase
        @click="isUserNavigationVisible = !isUserNavigationVisible"
        class="text-white cursor-pointer transform transition-colors hover:text-secondary-darken"
        width="40"
        height="40"
        icon="manageAccount" />
    </span>
  </aside>
</template>

<script>
import siteNavOptions from '@enums/nav/router.competitonsStaticbar.js'
import UserNavigation from './partial/UserNavigation.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'TheStaticSidebar',
  data () {
    return {
      siteNav: siteNavOptions,
      isUserNavigationVisible: false,
    }
  },
  computed: {
    ...mapGetters( {
      isAuth: 'auth/isAuth',
    } )
  },
  components: {
    UserNavigation
  },
}
</script>

<style lang="scss" scoped>
.static-sidebar__nav {
  @apply flex relative text-white hover:text-secondary-lighten transition-colors;

  &::before {
    @apply block w-1 h-full absolute left-0 top-0 transform-gpu scale-x-0 origin-left
      transition-transform duration-200 ease-in-out bg-current;
    content: "";
  }

  &--selected {
    @apply text-secondary #{!important};

    &::before {
      @apply scale-x-100;
    }
  }
}
</style>
