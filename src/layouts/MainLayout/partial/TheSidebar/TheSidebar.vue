<template >
  <div
    @click="$emit('update:isSidebarVisible', false)"
    :class="['sidebar__wrapper', {'sidebar--visible': isSidebarVisible}]" >
    <aside
      :data-visible="isSidebarVisible"
      class="sidebar" >
      <div
        @click.stop
        class="sidebar__inner" >

        <zIconBase
          @click="$emit('update:isSidebarVisible', false)"
          class="text-white cursor-pointer ml-4 mb-8"
          width="40"
          height="40"

          icon-name="menu" />

        <ul
          class="sidebar__site-navigation"
          type="none" >
          <router-link
            class="sidebar__site-nav"
            v-for="option of options.site"
            :key="option.name"
            :to="{name: option.name}"
            exact-active-class="sidebar__site-nav--selected" >

            <zIconBase
              class="sidebar__site-nav-icon"
              :icon-name="option.iconName" />

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

<script>
import navOptions from '@enums/nav/sidebar.options.js'
import zIconBase from '@components/composite/zIconBase.vue'
import Profile from './partial/Profile.vue'

export default {
  emits: [ 'update:isSidebarVisible' ],
  props: {
    isSidebarVisible: {
      type: Boolean,
      required: true,
    }
  },
  watch: {
    $route ( to, from ) {
      this.$emit( 'update:isSidebarVisible', false )
    }
  },
  data () {
    return {
      options: navOptions,
    }
  },

  components: {
    zIconBase,
    Profile
  },
}
</script>

<style lang="scss" scoped>

.sidebar__wrapper {
  @apply fixed left-0 top-0 w-screen h-screen invisible;

  &::after {
    content: '';

    @apply absolute left-0 top-0 w-screen h-screen bg-black bg-opacity-70 -z-10 invisible opacity-0 transition-all duration-300;
  }
}

.sidebar {
  @apply absolute z-30 h-full w-9/12 md:w-5/12 bg-black-lighten overflow-hidden transform-gpu -translate-x-full transition-all duration-300 border-r border-placeholder border-solid border-opacity-25;
}

.sidebar--visible {
  @apply visible;

  & > .sidebar {
    @apply translate-x-0;
  }

  &::after {
    @apply visible opacity-100;
  }
}

.sidebar__inner {
  @apply h-full w-full flex flex-col py-6;

  &::before {
    content: '';

    @apply block w-full h-full absolute left-0 top-0 bg-primary-darkest opacity-20 filter blur-lg -z-10;
  }
}

.sidebar__site-navigation {
  @apply flex flex-col flex-grow ;
}

.sidebar__site-nav {
  @apply flex items-center text-white text-lg py-3 mt-3 pl-4 transition-colors duration-200 select-none relative ;

  &::after {
    content: '';

    @apply block w-10/12 absolute left-0 bottom-0 border-b border-white border-solid border-opacity-30;
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
