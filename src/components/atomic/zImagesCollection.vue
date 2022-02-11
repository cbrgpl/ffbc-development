<template >
  <div class="z-images-collection__wrapper" >
    <div
      v-if="loader"
      class="z-images-collection__loader" >
      <zLoader
        :width="72"
        :height="72" />
    </div>
    <div
      @view="showImage"
      v-bind="$attrs"
      @resource-load="count"
      :class="['z-images-collection', {'z-images-collection--loading': loader}]" >
      <slot ></slot>
    </div>
    <div
      @click="viewerSrc = null"
      v-if="viewerSrc !== null && images.length > 0"
      class="z-images-collection__viewer" >

      <div
        @click.stop
        class="z-images-collection__viewer-inner" >
        <button
          @click="prevSrc"
          class="z-images-collection__button" >
          &#10156;
        </button>
        <div class="z-images-collection__viewer-wrapper" >
          <img
            draggable="false"
            class="z-images-collection__view-image"
            :src="viewerSrc"
            alt="" >
        </div>
        <span class="z-images-collection__counter" >
          {{ viewSrcIndex + 1 }} / {{ images.length }}
        </span>

        <button
          @click="nextSrc"
          class="z-images-collection__button" >
          &#10156;
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import zLoader from '@components/atomic/zLoader.vue'
export default {
  inheritAttrs: false,
  name: 'zImagesCollection',
  props: {
    images: {
      type: Array,
      default () {
        return []
      },
    },
    loader: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      viewerSrc: null,
      loadedResources: 0,
    }
  },
  computed: {
    viewSrcIndex () {
      return this.images.indexOf( this.viewerSrc )
    }
  },
  methods: {
    showImage ( event ) {
      this.viewerSrc = event.detail.src
    },
    nextSrc () {
      this.viewerSrc = this.images[ this.changeSrcIndex( this.viewSrcIndex + 1 ) ]
    },
    prevSrc () {
      this.viewerSrc = this.images[ this.changeSrcIndex( this.viewSrcIndex - 1 ) ]
    },
    changeSrcIndex ( newIndex ) {
      if ( newIndex === -1 ) {
        return this.images.length - 1
      } else if ( newIndex === this.images.length ) {
        return 0
      } else return newIndex
    },
    count ( eve ) {
      this.loadedResources += 1

      if ( this.loadedResources === this.images.length ) {
        this.$emit( 'loaded', true )
      }
    },
  },
  components: {
    zLoader,
  }
}
</script>

<style lang="scss" scoped>
.z-images-collection {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: rem(25px) 15px;
  justify-items: center;
}

.z-images-collection--loading {
  filter: blur(32px);
}

.z-images-collection__wrapper {
  position: relative;
  overflow: hidden;
  min-height: rem(80px);
  padding: rem(15px) 0;
}

.z-images-collection__loader {

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background: rgba($black-DEFAULT, 0.8);
}

.z-images-collection__viewer {
  position: fixed;
  top: 0;
  left: 0;

  z-index: 100;

  display: flex;

  width: 100%;
  height: 100%;

  background: rgba($black-lighten, 0.8);
}

.z-images-collection__viewer-inner {

  position: relative;

  display: flex;
  align-items: stretch;
  margin: auto;
}

.z-images-collection__view-image {
  max-width: rem(320px);
  max-height: 80vh;

  font-size: rem(52px);
}

.z-images-collection__button {

  position: absolute;
  z-index: 1;
  width: 33%;
  min-width: rem(35px);

  height: 100%;

  color: transparent;
  font-size: rem(64px);

  transition: background 0.15s;

  &:active {
    background: rgba($black-lighten, 0.3);
  }

  &:first-child {
    left: 0;
  }

  &:last-child {
    right: 0;
  }
}

.z-images-collection__viewer-wrapper {
  overflow-x: auto;
  max-width: 90vw;
}

.z-images-collection__counter {
  position: absolute;
  top: 5px;
  right: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;

  text-shadow: $black-DEFAULT 0 0 4px;

  pointer-events: none;
  user-select: none;
}

@media screen and (min-width: 900px) {
  .z-images-collection__viewer-inner {
    align-items: center;
  }

  .z-images-collection__view-image {
    max-width: rem(600px);
  }

  .z-images-collection__button {
    width: auto;
    height: auto;
    border: 1px solid $white;
    border-radius: 100%;
    background: rgba($placeholder, 0.8);
    color: $black-DEFAULT;

    font-size: rem(72px);

    &:active {
      background: rgba($placeholder, 0.8);
    }

    &:first-child {
      transform: rotate(180deg) translateX(calc(100% + 20px));
    }

    &:last-child {
      transform: translateX(calc(100% + 20px));
    }
  }
}

</style>
