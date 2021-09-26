<template >
  <div
    v-bind="styles"
    class="z-action-button" >
    <zIconBase
      v-bind="attrs"
      :width="28"
      :height="28" />
  </div>
</template>

<script>
import { extenderMix } from '@mixins'

export default {
  inheritAttrs: false,
  name: 'actionButton',
  mixins: [ extenderMix ]
}
</script>

<style lang="scss" scoped>

.z-action-button {
  background: rgba($black-primary, 0.5);
  margin-right: rem(10px);
  padding: 4px;
  border-radius: 100%;
  pointer-events: auto;
  cursor: pointer;

  transition: background 200ms;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background: rgba($black-primary, 1);
  }
}
</style>
