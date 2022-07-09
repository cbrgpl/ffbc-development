<template >
  <div
    :class="['sidebar__wrapper', {'sidebar--visible': isSidebarVisible}]"
    @click="$emit('update:isSidebarVisible', false)" >
    <aside
      :data-visible="isSidebarVisible"
      class="sidebar" >
      <div
        class="sidebar__inner"
        @click.stop >
        <zIconBase
          class="text-white cursor-pointer ml-4 mb-8"
          width="40"
          height="40"
          icon="menu"

          @click="$emit('update:isSidebarVisible', false)" />

        <ul
          class="sidebar__site-navigation"
          type="none" >
          <router-link
            v-for="option of options.site"
            :key="option.name"
            class="sidebar__site-nav"
            :to="{name: option.name}"
            exact-active-class="sidebar__site-nav--selected" >
            <zIconBase
              class="sidebar__site-nav-icon"
              :icon="option.iconName" />

            <span class="sidebar__site-nav-text" >
              {{ option.name }}
            </span>
          </router-link>
        </ul>

        <Profile ></Profile>
      </div>
    </aside>
  </div>
</template>

<script >
import navOptions from '@enums/nav/router.competitionsSidebar.js'
import Profile from './partial/Profile.vue'

export default {
  name: 'TheSidebar',

  components: {
    Profile
  },
  props: {
    isSidebarVisible: {
      type: Boolean,
      required: true,
    }
  },
  emits: [ 'update:isSidebarVisible' ],
  data () {
    return {
      options: navOptions,
    }
  },
  watch: {
    $route () {
      this.$emit( 'update:isSidebarVisible', false )
    }
  },
}
</script>

<style lang="scss" scoped >
.sidebar__wrapper {
  @apply fixed left-0 top-0 w-screen h-screen invisible;

  &::after {
    @apply absolute left-0 top-0 w-screen h-screen bg-black bg-opacity-70
      -z-10 invisible opacity-0 transition-all duration-300;

    content: '';
  }
}

.sidebar {
  @apply absolute z-30 h-full w-9/12 md:w-5/12 bg-black-lighten overflow-hidden transform-gpu -translate-x-full
    transition-all duration-300 border-r border-placeholder border-solid border-opacity-25;
}

.sidebar--visible {
  @apply visible;

  > .sidebar {
    @apply translate-x-0;
  }

  &::after {
    @apply visible opacity-100;
  }
}

.sidebar__inner {
  @apply h-full w-full flex flex-col py-6;

  &::before {
    @apply block w-full h-full absolute left-0 top-0 bg-primary-darkest opacity-20 filter blur-lg -z-10;

    content: '';
  }
}

.sidebar__site-navigation {
  @apply flex flex-col flex-grow ;
}

.sidebar__site-nav {
  @apply flex items-center text-white text-lg py-3 mt-3 pl-4 transition-colors duration-200 select-none relative ;

  &::after {
    @apply block w-10/12 absolute left-0 bottom-0 border-b border-white border-solid border-opacity-30;

    content: '';
  }

  &--selected {
    @apply text-secondary;

    &::after {
      @apply border-secondary;
    }
  }
}

.sidebar__site-nav-icon {
  @apply w-9 h-9 p-0.5 pb-1 ml-1;
}

.sidebar__site-nav-text {
  @apply ml-1.5;
}

</style>
