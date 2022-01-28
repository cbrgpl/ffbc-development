<template >
  <zSlider
    @newActiveElementNumber="setProductMediaShownByIndex( $event )"
    :elements-count="mediaCount"
    class="w-full h-36 border-b border-placeholder border-solid" >
    <div
      v-for="(src, i) of mediaSrcs"
      :key="src"
      class="bg-black-lightest h-full w-full flex-shrink-0" >
      <zMedia
        class="h-full"
        @click="showInMediaOverlay(src)"
        :original-src="src"
        :blur-src="require('@images/shop/blur-template.png')"
        :load-original="originalMediaVisibilityArray[i]"
        media-type="image" />
    </div>
  </zSlider>
</template>

<script>
import zSlider from '@components/composite/zSlider/zSlider.vue'

export default {
  name: 'zShopProductSlider',
  props: {
    mediaSrcs: {
      type: Array,
      required: true
    }
  },
  computed: {
    mediaCount () {
      return this.mediaSrcs.length
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
    showInMediaOverlay ( mediaSrc ) {
      this.mediaViewOverlay$.show( mediaSrc )
    },
  },
  components: {
    zSlider
  }
}
</script>

<style lang="scss" scoped>

</style>
