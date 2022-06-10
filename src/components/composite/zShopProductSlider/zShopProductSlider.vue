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
        :src="aMedia.display"
        :preview="aMedia.preview"
        :load-display-src="displaySrcsVisiblity[i]"
        media-type="image" />
    </div>
  </zSlider>
</template>

<script>
import zSlider from '@components/composite/zSlider/zSlider.vue'

export default {
  name: 'zShopProductSlider',
  props: {
    media: {
      type: Array,
      required: true
    },
    intersected: {
      type: Boolean,
    },
  },
  data () {
    return {
      displaySrcsVisiblity: []
    }
  },
  computed: {
    mediaCount () {
      return this.media.length
    },
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
      const srcsVisibility = new Array( this.mediaCount )
      this.displaySrcsVisiblity = srcsVisibility.fill( false )
    },
    setNonReactiveMediaBuffer () {
      this.mediaBuffer = []
    },
    setProductMediaShownByIndex ( mediaIndex ) {
      this.displaySrcsVisiblity[ mediaIndex ] = true
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
