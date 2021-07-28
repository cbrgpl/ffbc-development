<template >
  <aside
    :data-sidebar-mode="sidebarMode"
    :data-visible="sidebarVisibleMobile"
    class="sidebar sidebar-mobile sidebar-desktop sidebar--closed" >
    <!-- TODO Думаю стоит переработать по-нормальному, переключая класс самому меню через vue; Сейчас в стилях полнейшая неразбериха. Сейчас не хочу этого делать. Крайне устал -->
    <div class="sidebar__inner" >
      <SidebarSettings
        class="hidden lg:flex lg:items-center lg:space-x-4  "
        :sidebar-mode="sidebarMode"
        @update:sidebarMode="$emit('update:sidebarMode', $event)" />

      <div class="sidebar__logo-placement sidebar__child-part" >
        <!-- TODO Сделать user-select: none; -->
        <img
          class="sidebar__logo-image"
          width="32px"
          height="32px"
          :src="logoPath"
          alt="" >
      </div>

      <ul
        class="sidebar__site-navigation sidebar__child-part"
        type="none" >
        <!-- TODO Сделать, чтобы при наведении на иконку показывался tooltip с пояснением -->
        <router-link
          class="sidebar__site-option"
          v-for="option of options.site"
          :key="option.name"
          :to="{name: option.name}"
          exact-active-class="sidebar__site-option--selected" >

          <zIconBase
            class="sidebar__site-option-icon"
            :icon-name="option.iconName" />

          <span class="sidebar__site-option-text" >
            {{ option.name }}
          </span>
        </router-link>

        <li class="sidebar__site-option cursor-pointer" >
          <zIconBase
            class="sidebar__site-option-icon"
            title="Account Logout"
            icon-name="logout" />
          <span class="sidebar__site-option-text" >
            Logout
          </span>
        </li>
      </ul>

      <ul class="sidebar__account-navigation sidebar__child-part" >
        <router-link
          class="sidebar__account-option"
          v-for="option of options.profile"
          :key="option.name"
          :to="{name: option.name}"
          exact-active-class="sidebar__account-option--selected"
          tag="li" >
          <zIconBase
            class="transform -translate-y-0.5"
            width="100%"
            height="100%"
            :title="option.label"
            :icon-name="option.iconName" />
        </router-link>

      </ul>
    </div>

  </aside>
</template>

<script>
import navOptions from '@enums/nav/sidebar.options.js'

import SidebarSettings from './partial/SidebarSettings.vue'

import zIconBase from '@components/composite/zIconBase.vue'

export default {
  emits: [ 'update:sidebarMode' ],
  props: {
    sidebarMode: {
      type: String,
      required: true,
    },
    sidebarVisibleMobile: {
      type: Boolean,
      required: true,
    }
  },
  data () {
    return {
      options: navOptions,
      logoPath: require( '@images/logo.png' )
    }
  },
  components: {
    zIconBase,
    SidebarSettings,

  },
}
</script>

<style lang="scss" scoped>
@mixin sidebar-collapsed {
  @apply w-12;

  & > {
    & .sidebar__child-part {
      @apply px-1.5;
    }
  }

  & ::v-deep(.sidebar__logo-image) {
    @apply opacity-0;
  }

  & ::v-deep(.sidebar__setting-toggle) {
    opacity: 0;
  }

  & .sidebar__site-option-text {
    @apply hidden #{!important};
  }

  & ::v-deep(.sidebar__open-toggler) {
    @apply translate-x-2/4 right-2/4;
  }

  & .sidebar__account-option:nth-child(n + 2) {
    @apply translate-y-16;
  }
}
// equal to [data-sidebar-mode="alwaysOpen"]
.sidebar-desktop {
  @apply lg:bg-black-lighten lg:w-48 bg-opacity-95 overflow-hidden lg:border-r border-placeholder border-solid border-opacity-25 transition-all duration-500;

  & ::v-deep(.sidebar__open-toggler) {
    @apply rotate-180 right-2 translate-x-0;
  }
}

// mobile-version styles
.sidebar[data-sidebar-mode="disabled"] {
  @apply w-0;

  & .sidebar__account-navigation {
    @apply transform lg:transform-none -translate-y-full transition-transform;
  }
}

.sidebar[data-sidebar-mode="disabled"][data-visible="true"] {
  @apply w-7/12;

  & .sidebar__account-navigation {
    @apply translate-y-0 duration-500 delay-200;
  }
}

.sidebar-desktop[data-sidebar-mode="collapsable"] {
  & ::v-deep(.sidebar__open-toggler) {
    @apply -rotate-90 cursor-default;
  }

  &:not(:hover) {
    @include sidebar-collapsed();
  }
}

.sidebar-desktop[data-sidebar-mode="alwaysCollapsed"] {
  @include sidebar-collapsed();

  & ::v-deep(.sidebar__open-toggler) {
    @apply rotate-0;
  }
}

.sidebar__inner {
  @apply h-full w-full overflow-hidden flex flex-col;

  &::before {
    content: '';

    @apply block w-full h-full absolute left-0 top-0 bg-primary-darkest opacity-10 filter blur-lg -z-10 ;
  }
}

.sidebar__logo-placement {
  @apply hidden lg:flex items-center overflow-visible h-20 py-2 bg-black-lighten bg-opacity-50 mb-4;
}

.sidebar__logo-image {
  @apply w-44 flex-shrink-0 h-10 max-w-none transition-opacity duration-200;
}

.sidebar__site-navigation {
  @apply flex flex-col flex-grow order-2;
}

.sidebar__site-option {
  @apply flex items-center text-white text-lg lg:text-sm py-2.5 lg:py-1 my-2.5 relative transition-colors duration-300 select-none;

  &::after {
    content: '';

    @apply block h-0.5 w-full absolute bottom-0 bg-current rounded-md transform scale-x-0 origin-left lg:origin-center  transition-transform duration-500;
  }

  &::before {
    content: '';

    @apply block lg:hidden border-b border-solid border-placeholder border-opacity-70 w-11/12 absolute bottom-0;
  }

  &:hover {
    &::after {
      @apply opacity-80 scale-x-50;
    }
  }

  &--selected {
    @apply text-secondary;

    &::after {
      @apply scale-x-95;
    }

    &:hover {
      &::after {
        @apply opacity-100 scale-x-95;
      }
    }
  }
}

.sidebar__site-option-icon {
  @apply w-8 h-8 p-0.5 pb-1 ml-1 flex-shrink-0;
}

.sidebar__site-option-text {
  @apply ml-1.5;
}

.sidebar__account-navigation {
  @apply order-1 lg:order-3 flex items-center justify-between h-14  bg-black-lighten lg:bg-opacity-50 py-2 lg:py-1 mb-8 lg:mb-0;
}

.sidebar__account-option {
  @apply flex items-center justify-center flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12 lg:w-9 lg:h-9 rounded-2xl lg:rounded-lg lg:bg-black text-white border-2 border-solid border-black transform transition-transform duration-500 p-1.5;

  &:hover {
    @apply text-secondary;
  }

  &--selected {
    @apply border-secondary text-secondary-lighten;
  }
}

.sidebar__child-part {
  @apply pl-3.5 pr-3 lg:px-1 border-b border-primary-darkest lg:border-black border-solid;
}

@keyframes show-open-button {
  0% {
    transform: translateX(0);
    opacity: 0;
  }

  78% {
    transform: translateX(115%);
  }

  100% {
    transform: translateX(100%);
    opacity: 1;
  }
}

</style>
