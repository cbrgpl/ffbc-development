<template >
  <div class="overflow-x-hidden" >
    <ul
      :ref="listRef"
      class="z-tabs-menu"
      role="tablist" >
      <li
        :ref="indicatorRef"
        :class="indicatorClasses" ></li>
      <li
        :ref="selectedRef"
        v-for="keyword of tabKeywords"
        :key="keyword"
        @click="$emit( 'update:modelValue', keyword )"
        :class="['z-tabs-menu__tab', {'z-tabs-menu__tab--selected': keyword === modelValue}]"
        role="tab" >
        <slot
          :tab="getTabByKeyword(keyword)"
          :active="keyword === modelValue" >
          {{ keyword }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
import DomHandler from '@classes/DomHandler.class.js'

export default {
  name: 'zTabNav',
  props: {
    modelValue: {},
    tabs: {
      type: Array,
      required: true
    },
    keywordGetter: {
      type: Function,
      default () {
        return ( tab ) => tab
      }
    },
    indicatorMovement: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      indicatorParams: {
        transitionClasses: 'transition-all duration-300'
      },
      tabRefs: []
    }
  },
  list: null,
  indicator: null,
  mounted () {
    this.startTabWatch()
  },
  computed: {
    indicatorClasses () {
      return [
        'z-tabs-menu__indicator',
        { 'transition-all duration-300': this.indicatorMovement }
      ]
    },
    tabKeywords () {
      return this.tabs.map( ( tab ) => this.keywordGetter( tab ) )
    },

  },
  methods: {
    startTabWatch () {
      this.$watch(
        () => this.modelValue,
        function ( newTab ) {
          // из-за скролла немного криво позиционируется, ждем пока появится скролл, потом выполняем обновление
          setTimeout( () => {
            this.updateIndicator( this.searchElem() )
          }, 0 )
        },
        {
          immediate: true,
        }
      )
    },
    updateIndicator ( $selectedTab ) {
      if ( !$selectedTab ) {
        return
      }

      const $l = this.list

      this.indicator.shift = $selectedTab.offsetLeft
      this.indicator.width = DomHandler.getOuterWidth( $selectedTab )

      $l.style.setProperty( '--indicator-shift', $selectedTab.offsetLeft + 'px' )
      $l.style.setProperty( '--indicator-width', DomHandler.getOuterWidth( $selectedTab ) + 'px' )
    },
    listRef ( el ) {
      this.list = el
    },
    selectedRef ( el ) {
      if ( el ) {
        this.tabRefs.push( el )
      }
    },
    searchElem () {
      for ( const el of this.tabRefs ) {
        if ( el.classList.contains( 'z-tabs-menu__tab--selected' ) ) {
          return el
        }
      }
    },
    indicatorRef ( el ) {
      this.indicator = el
    },
    getTabByKeyword ( keyword ) {
      return this.tabs.find( ( tab ) => this.keywordGetter( tab ) === keyword )
    }
  },
}
</script>

<style lang="scss" scoped>
.z-tabs-menu {
  --indicator-shift: 0;
  --indicator-width: 0;

  @apply flex items-center justify-between relative font-semibold pb-0.5;
}

.z-tabs-menu__tab {
  @apply cursor-pointer mr-4 select-none transition-colors duration-300 pb-1;

  &--selected {
    @apply text-primary-lighten;
  }

  &:last-child {
    @apply mr-0;
  }
}

.z-tabs-menu__indicator {
  @apply absolute ease-in-out bottom-0 w-5 h-0.5 rounded-lg bg-current;
  width: var(--indicator-width);
  transform: translateX(var(--indicator-shift));
}

</style>
