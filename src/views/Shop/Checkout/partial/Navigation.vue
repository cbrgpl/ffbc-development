<template >
  <zBlockableTabNav
    :tabs="checkoutNavigation.tabs"
    :blocks="checkoutNavigation.blocks"
    :keyword-getter="keywordGetter"
    :indicator-movement="false" >
    <template #default="{ tab, active, passed }" >
      <div
        v-tooltip.right="tab.title"
        :class="getTabClasses(active, passed)" >
        <zIconBase
          class="w-12 md:w-16"
          :icon="tab.icon" />
      </div>
    </template>
  </zBlockableTabNav>
</template>

<script >
import zBlockableTabNav from '@general_components/composite/zBlockableTabNav'

export default {
  name: 'Navigation',
  components: {
    zBlockableTabNav
  },
  props: {
    checkoutNavigation: {
      type: Object,
      required: true,
    }
  },
  methods: {
    keywordGetter ( tab ) {
      return tab.keyword
    },
    getTabClasses ( active, passed ) {
      return [
        'tab',
        {
          'tab--unpassed': passed === false,
          'tab--passed': passed === true,
          'tab--active': active,
          'tab--disabled': passed === null
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped >
.tab {
  @apply transition-all duration-150 ease-linear;
}

.tab--unpassed {
  @apply text-placeholder text-opacity-70;
}

.tab--passed {
  @apply text-primary-darken text-opacity-90;
}

.tab--active {
  @apply text-primary;
}

.tab--disabled:first-child {
  @apply text-danger-darken;
}
</style>
