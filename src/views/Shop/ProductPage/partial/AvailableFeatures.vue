<template >
  <ul
    aria-label="List of features for the product:"
    class="features-list" >
    <li
      class="mb-6"
      v-for="feature of features"
      :key="feature.name" >

      <div class="flex items-center mb-3" >
        <zFeatureIcon
          class="mr-4"
          :feature-icon-data="feature" />
        <h4 >{{ feature.name }}</h4>
      </div>

      <ul class="ml-6" >
        <li
          class="feature-value flex items-center mb-2.5"
          v-for="field of feature.featureFields"
          :key="field.id" >
          <span >{{ field.name }}</span>
        </li>
      </ul>

    </li>

  </ul>
</template>

<script>
import zFeatureIcon from '@components/atomic/zFeatureIcon.vue'

export default {
  name: 'AvailableFeatures',
  props: {
    features: {
      type: Array,
      required: true,
    },
  },
  components: {
    zFeatureIcon,
  }
}
</script>

<style lang="scss" scoped>
.features-list {
  &::before {
    @apply inline-block text-2xl underline mb-7;

    content: attr(aria-label);
  }
}

.feature-value {
  &::before {
    @apply inline-block w-2 h-2 rounded-sm bg-primary-lightest mr-2;
    content: "";
  }
}
</style>
