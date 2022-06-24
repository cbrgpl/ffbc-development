<template >
  <zSlider
    @newActiveElementNumber="setProductMediaShownByIndex( $event )"
    :elements-count="mediaCount"
    class="w-full h-36 border-b border-placeholder border-solid" >
    <div
      v-for="(aMedia, i) of media"
      :key="aMedia.original"
      class="bg-black-lightest h-full w-full flex-shrink-0" >
      <zMedia
        :ref="pushMediaToBuffer"
        class="h-full"
        :original="aMedia.display"
        :preview="aMedia.preview"
        :show-original="originalsVisibility[i]"
        :auto-loading="mediaAutoLoading"
        media-type="image" />
    </div>
  </zSlider>
</template>

<script>
import zSlider from '@general_components/composite/zSlider/zSlider.vue'

export default {
  name: 'zShopProductSlider',
  props: {
    media: {
      type: Array,
      required: true
    },
    intersected: {
      type: Boolean,
      default: null,
    },
  },
  data () {
    return {
      originalsVisibility: [],
    }
  },
  computed: {
    mediaCount () {
      return this.media.length
    },
    mediaAutoLoading () {
      return this.intersected === null
    }
  },
  watch: {
    intersected: {
      handler ( intersected ) {
        if ( intersected ) {
          for ( const mediaVNode of this.mediaBuffer ) {
            mediaVNode.startLoading()
          }
        }
      },
      immediate: true,
    }
  },
  created () {
    this.setDisplaySrcsVisibility()
    this.setNonReactiveMediaBuffer()
  },
  methods: {
    setDisplaySrcsVisibility () {
      const originalsVisibility = new Array( this.mediaCount )
      this.originalsVisibility = originalsVisibility.fill( false )
    },
    setNonReactiveMediaBuffer () {
      this.mediaBuffer = []
    },
    setProductMediaShownByIndex ( mediaIndex ) {
      this.originalsVisibility[ mediaIndex ] = true
    },
    pushMediaToBuffer ( vNode ) {
      if ( !this.mediaBuffer.includes( vNode ) ) {
        this.mediaBuffer.push( vNode )
      }
    }
  },
  components: {
    zSlider
  }
}
</script>

<style lang="scss" scoped>

</style>
