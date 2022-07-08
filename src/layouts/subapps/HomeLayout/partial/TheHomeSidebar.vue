<template >
  <div class="hidden md:flex flex-col flex-shrink-0 bg-black-primary pl-2 md:w-52 lg:w-72 border-r border-solid border-white border-opacity-25 select-none" >
    <div
      v-if="indicatorParams.top !== 0"
      :style="indicatorStyles"
      class="fixed left-0 top-0 w-1 bg-secondary-lighten opacity-50 rounded-lg transition-all ease-out" ></div>
    <router-link
      v-for="option in homeNavigation"
      :ref="addToLinksList"
      :key="option.routeName"
      active-class="text-secondary"
      class="flex items-center py-3 my-2 transition-colors duration-200 ease-in-out leading-tight md:text-md lg:text-lg"
      :to="{name: option.routeName}"
      @click="updateIndicatorPosition($event.target)" >
      <zIconBase
        :width="32"
        :height="32"
        class="mr-2"
        :icon="option.iconName" />
      {{ option.text }}
    </router-link>
  </div>
</template>

<script >
import homeNavigation from '@enums/nav/router.competitionsHome.js'

export default {
  name: 'TheHomeSidebar',
  data () {
    return {
      homeNavigation,
      indicatorParams: {
        top: 0,
        height: 40,
      },
      linksList: []
    }
  },
  computed: {
    indicatorStyles () {
      return {
        transform: `translateY(${ this.indicatorParams.top }px)`,
        height: this.indicatorParams.height + 'px'
      }
    }
  },
  mounted () {
    this.setIndicatorDefaultPos()
  },
  methods: {
    addToLinksList ( routerLink ) {
      if ( routerLink ) {
        this.linksList.push( routerLink.$el )
      }
    },
    setIndicatorDefaultPos () {
      for ( const linkElem of this.linksList ) {
        if ( linkElem.classList.contains( 'text-secondary' ) ) {
          this.updateIndicatorPosition( linkElem )
          return
        }
      }
    },
    updateIndicatorPosition ( link ) {
      const targetBoundingClientRect = link.getBoundingClientRect()
      this.indicatorParams.top = targetBoundingClientRect.top - ( ( this.indicatorParams.height - targetBoundingClientRect.height ) * 0.5 )
    },

  }
}
</script>

<style lang="scss" scoped >
</style>
