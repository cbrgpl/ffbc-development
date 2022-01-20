
<template >
  <div
    @click="emitCustomClick"
    v-bind="styles"
    class="z-image__wrapper" >
    <img
      @load="emitCustomLoad"
      v-bind="attrs"
      class="z-image__image"
      alt="" >

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
  methods: {
    emitCustomClick ( event ) {
      const viewImageEvent = new CustomEvent( 'view', {
        bubbles: true,
        cancelable: true,
        detail: {
          component: this.$options.name,
          src: this.attrs.src
        }
      } )

      event.target.dispatchEvent( viewImageEvent )
    },
    emitCustomLoad () {
      const imageLoadEvent = new CustomEvent( 'resource-load', {
        bubbles: true,
        cancelable: true,
        detail: {
          component: this.$options.name,
        }
      } )

      event.target.dispatchEvent( imageLoadEvent )
    }
  }
}
</script>

<style lang="scss" scoped>
.z-image__wrapper {
  position: relative;
  cursor: pointer;
}

.z-image__image {
  object-fit: cover;
  width: 100%;
  height: 100%;

  transition: filter 350ms ease-in 45ms;

  &:hover {
    filter: brightness(0.75);
  }
}

.z-image__actions {
  position: absolute;
  top: rem(5px);
  right: rem(5px);

  pointer-events: none;
}

</style>
