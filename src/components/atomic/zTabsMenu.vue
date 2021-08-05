<template >
  <ul
    :ref="listRef"
    class="z-tabs-menu"
    role="tablist" >
    <li
      :ref="selectedRef"
      v-for="tab in tabs"
      :key="tab"
      @click="tabClick($event, tab)"
      :class="['z-tabs-menu__tab', {'z-tabs-menu__tab--selected': tab === modelValue}]"
      role="tab" >
      {{ tab }}
    </li>

    <li
      :ref="indicatorRef"
      class="z-tabs-menu__indicator" ></li>
  </ul>
</template>

<script>
import DomHandler from '@classes/DomHandler.class.js'

export default {
  name: 'TabsMenu',
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
      }
    }
  },
  list: null,
  selectedTab: null,
  indicator: null,
  mounted () {
    this.updateIndicator( this.selectedTab )

    if ( this.indicatorMovement ) {
      this.addIndicatorDuration()
    }
  },
  methods: {
    tabClick ( event, tab ) {
      this.$emit( 'update:modelValue', tab )

      this.updateIndicator( event.target )
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
    addIndicatorDuration () {
      const $i = this.indicator

      DomHandler.addMultipleClass( $i, this.indicatorParams.transitionClasses )
    },
    listRef ( el ) {
      this.list = el
    },
    selectedRef ( el ) {
      if ( el ) {
        if ( el.innerText === this.modelValue ) {
          this.selectedTab = el
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

  @apply flex items-center relative font-semibold text-xl pb-0.5;
}

.z-tabs-menu__tab {
  @apply cursor-pointer mr-2 select-none transition-colors duration-300;

  &--selected {
    @apply text-primary-lighten;
  }
}

.z-tabs-menu__indicator {
  @apply absolute transform ease-out bottom-0 w-5 h-0.5 rounded-lg bg-current;

  --tw-translate-x: var(--indicator-shift);

  width: var(--indicator-width);
}

</style>
