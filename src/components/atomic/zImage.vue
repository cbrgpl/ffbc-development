
<template >
  <div
    v-bind="styles"
    class="z-image__wrapper" >
    <img
      width="0"
      height="0"
      v-bind="attrs"
      class="z-image__image" >

    <span class="z-image__actions" >
      <slot name="actions" ></slot>
    </span>
  </div>
</template>

<script>
import { extenderMix } from '@mixins'

export default {
  inheritAttrs: false,
  name: 'zImage',
  mixins: [ extenderMix ],
}
</script>

<style lang="scss" scoped>
.z-image__wrapper {
  position: relative;
}

.z-image__image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.z-image__actions {
  position: absolute;
  top: rem(5px);
  right: rem(5px);

  pointer-events: none;
}

</style>
