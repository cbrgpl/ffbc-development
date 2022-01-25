<template >
  <ul
    :ref="listRef"
    class="z-tabs-menu"
    role="tablist" >
    <li
      :ref="selectedRef"
      v-for="tab in tabs"
      :key="tab"
      @click="$emit( 'update:modelValue', tab )"
      :class="['z-tabs-menu__tab', {'z-tabs-menu__tab--selected': tab === modelValue}]"
      role="tab" >
      <slot > {{ tab }} </slot>
    </li>

    <li
      :ref="indicatorRef"
      :class="indicatorClasses" ></li>
  </ul>
</template>

<script>
import DomHandler from '@classes/DomHandler.class.js'

export default {
  name: 'zTabsMenu',
  props: {
    modelValue: {},
    tabs: {
      type: Array,
      required: true
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
    }
  },
  methods: {
    startTabWatch () {
      this.$watch(
        () => this.modelValue,
        function ( newTab ) {
          setTimeout( () => {
            // из-за скролла немного криво позиционируется, ждем пока появится скорлл, потом выполняем обновление
            this.updateIndicator( this.searchElem( newTab ) )
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
    searchElem ( modelValue ) {
      for ( const el of this.tabRefs ) {
        if ( el.innerText === modelValue ) {
          return el
        }
      }
    },
    indicatorRef ( el ) {
      this.indicator = el
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
  @apply cursor-pointer mr-2 select-none transition-colors duration-300 pb-1;

  &--selected {
    @apply text-primary-lighten;
  }
}

.z-tabs-menu__indicator {
  @apply absolute ease-in-out -bottom-1 w-5 h-0.5 rounded-lg bg-current;
  width: var(--indicator-width);
  transform: translateX(var(--indicator-shift));
}

</style>
