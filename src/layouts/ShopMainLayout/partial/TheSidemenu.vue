<template >
  <aside :class="['z-100 absolute w-full xl:static h-full bg-black-lighten overflow-auto xl:w-auto flex-shrink-0 pt-4 transform transition-transform duration-500 ease-in-out', sidebarVisibilityClasses]" >
    <h3 class="sidemenu-list-title" >
      Site Navigation:
    </h3>
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

    <h3 class="sidemenu-list-title" >
      Goods Navigation:
    </h3>
    <SidemenuNavigationList :navigation-options="goodSections" >
      <template v-slot:default="{ value: sectionName, key: productType  }" >
        <router-link
          exact-active-class="text-primary"
          class="sidemenu-list-link"
          :to="{name: 'ShopProductCatalog', params: {productType} }" >
          {{ sectionName }}
        </router-link>
      </template>
    </SidemenuNavigationList>

    <template v-if="isAuth" >
      <zDivider class="my-6" />

      <h3 class="sidemenu-list-title" >
        Actions:
      </h3>
      <SidemenuNavigationList :navigation-options="systemActions" >
        <template v-slot:default="{value: submissionOfAction, key: actionName}" >
          <a
            :class="['sidemenu-list-link items-center transition-colors duration-75', disabledActionClasses]"
            @click.prevent="executeStategy(actionName)" >
            <zIconBase
              class="sidemenu-list-link-icon h-7 mr-1.5"
              :icon="submissionOfAction.icon" />
            {{ submissionOfAction.title }}

          </a>
        </template>
      </SidemenuNavigationList>
    </template>
  </aside>
</template>

<script>
import shopNavigation from '@enums/nav/shopNavigation.options'
import goodSections from '@/enums/info/productSections'
import SidemenuNavigationList from './TheSidemenuNavigationList.vue'

import StrategyContext from '@classes/strategy.js'
import { clearAuthInfo } from '@functions'

export default {
  name: 'TheSidemenu',
  emits: [ 'change-sidebar-visibility' ],
  props: {
    visible: {
      type: Boolean,
      required: true,
    }
  },
  data () {
    return {
      shopNavigation,
      goodSections,
      contextOfStrategyActions: new StrategyContext(),
      actionExecuting: false,
      systemActions: {
        logOut: {
          title: 'Log Out',
          icon: 'logout'
        },
      },
    }
  },
  computed: {
    sidebarVisibilityClasses () {
      return {
        'translate-x-0': this.visible,
        '-translate-x-full xl:translate-x-0': !this.visible
      }
    },
    disabledActionClasses () {
      return {
        'pointer-events-none cursor-default text-black-lightest text-opacity-90': this.actionExecuting
      }
    },
    isAuth () {
      return this.$store.getters[ 'auth/isAuth' ]
    }
  },
  methods: {
    async executeStategy ( actionName ) {
      const action = this[ actionName ]
      this.contextOfStrategyActions.setStrategy( action )

      this.actionExecuting = true
      await this.contextOfStrategyActions.executeStrategy()
      this.actionExecuting = false
    },
    async logOut () {
      await this.$store.dispatch( 'auth/logOut' )

      clearAuthInfo()

      this.emitSidebarHiding()
      this.$router.push( { name: 'ShopMain' } )
    },
    emitSidebarHiding () {
      this.$emit( 'change-sidebar-visibility', false )
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
  @apply flex py-3.5 md:py-4 pl-14 pr-5 xl:text-xl xl:py-2
    cursor-pointer transition-colors hover:bg-primary-darkest hover:bg-opacity-25;
}

</style>
