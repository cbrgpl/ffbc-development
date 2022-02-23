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
        class="h-full"
        v-bind="aMedia"
        :load-display-src="originalMediaVisibilityArray[i]"
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
    }
  },
  computed: {
    mediaCount () {
      return this.media.length
    },
  },
  data () {
    return {
      originalMediaVisibilityArray: null
    }
  },
  created () {
    this.initOriginalMediaVisibilityArray()
  },
  methods: {
    initOriginalMediaVisibilityArray () {
      this.originalMediaVisibilityArray = ( new Array( this.mediaCount ) ).fill( false )
    },
    setProductMediaShownByIndex ( mediaIndex ) {
      this.originalMediaVisibilityArray[ mediaIndex ] = true
    },
  },
  components: {
    zSlider
  }
}
</script>

<style lang="scss" scoped>

</style>
