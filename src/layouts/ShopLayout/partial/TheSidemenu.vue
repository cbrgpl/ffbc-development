<template >
  <aside :class="['absolute w-full xl:static h-full bg-black-lighten overflow-auto xl:w-auto flex-shrink-0 pt-4 transform transition-transform duration-500 ease-in-out', sidebarVisibilityStyles]" >
    <h2 class="sidemenu-list-title" >
      Site Navigation:
    </h2>

    <SidemenuNavigationList :navigation-options="shopNavigation" >
      <template v-slot:default="{ value: route }" >
        <router-link
          exact-active-class="text-primary border-primary"
          class="sidemenu-list-link"
          :to="{ name: route.routeName }" >
          {{ route.name }}
        </router-link>
      </template>
    </SidemenuNavigationList>
    <zDivider class="my-6" />
    <h2 class="sidemenu-list-title" >
      Goods Navigation:
    </h2>

    <SidemenuNavigationList :navigation-options="goodSections" >
      <template v-slot:default="{ value: sectionName, key: sectionCode  }" >
        <router-link
          exact-active-class="text-primary"
          class="sidemenu-list-link"
          :to="{name: 'ShopGoodCatalog', params: {sectionCode} }" >
          {{ sectionName }}
        </router-link>
      </template>
    </SidemenuNavigationList>
  </aside>
</template>

<script>
import shopNavigation from '@enums/nav/shopNavigation.options'
import goodSections from '@/enums/info/goodSections'
import SidemenuNavigationList from './TheSidemenuNavigationList.vue'

export default {
  name: 'TheSidemenu',
  props: {
    visible: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    sidebarVisibilityStyles () {
      return this.visible ? `
        translate-x-0
      ` : `
      -translate-x-full
      xl:translate-x-0
      `
    }
  },
  data () {
    return {
      shopNavigation,
      goodSections,
    }
  },
  components: {
    SidemenuNavigationList
  }
}
</script>

<style lang="scss" scoped>
.sidemenu-list-title {
  @apply inline-block mb-2 mx-4 lg:mx-6 xl:text-2xl xl:border-b xl:border-white xl:border-solid;
}

.sidemenu-list-link {
  @apply block py-3.5 md:py-5 pl-14 pr-5 xl:text-xl xl:py-2 transition-colors hover:bg-primary-darkest hover:bg-opacity-25;
}
</style>
