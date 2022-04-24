<template >
  <zBlockableTabNav
    :tabs="checkoutNavigation.tabs"
    :blocks="checkoutNavigation.blocks"
    :keyword-getter="keywordGetter"
    :indicator-movement="false" >
    <template v-slot="{ tab, active, passed }" >
      <div
        :class="['transition-transform duration-150 ease-linear', {'transform scale-125': active}]"
        v-tooltip.right="tab.title" >
        {{ passed }}
        <zIconBase
          class="w-8 md:w-12"
          :icon="tab.icon" />
      </div>
    </template>
  </zBlockableTabNav>
</template>

<script>
import zBlockableTabNav from '@components/composite/zBlockableTabNav'

export default {
  name: 'Navigation',
  props: {
    checkoutNavigation: {
      type: Object,
      required: true,
    }
  },
  methods: {
    keywordGetter ( tab ) {
      return tab.keyword
    }
  },
  components: {
    zBlockableTabNav
  }
}
</script>

<style lang="scss" scoped>
</style>
