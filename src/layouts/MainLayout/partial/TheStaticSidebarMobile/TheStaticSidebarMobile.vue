<template >
  <ul class="w-full h-16 sm:h-20 bg-black-primary text-white flex items-center justify-around" >
    <li >
      <router-link
        class="p-2 sm:p-2.5"
        exact-active-class="text-secondary"
        :to="{name: 'Main'}" >
        <zIconBase
          width="32"
          height="32"
          icon="gallery" ></zIconBase>
      </router-link>
    </li>

    <li >
      <router-link
        class="p-2 sm:p-2.5"
        :to="{name: 'Main'}" >
        <zIconBase
          width="32"
          height="32"
          icon="message" ></zIconBase>
      </router-link>
    </li>

    <CentralButton />

    <li >
      <router-link
        class="p-2 sm:p-2.5"
        :to="{name: 'Main'}" >
        <zIconBase
          width="32"
          height="32"
          icon="ticket" ></zIconBase>
      </router-link>
    </li>

    <li >
      <router-link
        class="p-2 sm:p-2.5"
        :to="{name: 'ShopMain'}" >
        <zIconBase
          width="32"
          height="32"
          icon="cart" ></zIconBase>
      </router-link>
    </li>
  </ul>
</template>

<script>
import CentralButton from './partial/CentralButton.vue'

export default {
  name: 'TheStaticSidebarMobile',
  components: {
    CentralButton,
  }
}
</script>

<style lang="scss">
.static-sidebar-mobile__center-button {
  @apply w-20 h-20 bg-primary-darkest rounded-full flex cursor-pointer;
}
</style>
