<template >
  <div class="service-section-item mb-2 py-3 border-b border-solid border-placeholder border-opacity-25" >
    <zIconBase
      :width="32"
      :height="32"
      :icon="data.type.icon"
      :is-title="true"
      :title="data.type.title" />

    <span class="text-lg" >
      {{ data.type.fullTitle }}
    </span>
    <span class="font-mono text-xl tracking-wider" >
      {{ data.price }}
    </span>
  </div>
</template>

<script >
export default {
  name: 'ServiceSectionItem',
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped >
.service-section-item {
  display: grid;
  grid-template-columns: #{rem(32px)} minmax(#{rem(168px)}, 1fr) minmax(#{rem(40px)}, #{rem(120px)});
  grid-gap: 0 10px;
  align-items: center;
}
</style>
