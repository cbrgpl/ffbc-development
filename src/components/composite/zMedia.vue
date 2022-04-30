<template >
  <div
    v-bind="wrapperAttrs"
    class="relative" >

    <component
      @click="showInMediaOverlay"
      v-bind="attrs"
      :src="activeSrc"
      :is="mediaComponent" />

    <span class="absolute z-10 top-0 left-0 w-full h-full pointer-events-none" >
      <slot name="actions" />
    </span>
  </div>
</template>

<script>
import zImage from '@components/atomic/zImage.vue'
import zVideo from '@components/atomic/zVideo.vue'

import { extenderMix } from '@mixins/index'

export default {
  name: 'zMedia',
  mixins: [ extenderMix ],
  props: {
    mediaType: {
      type: String,
      default: 'image',
      validator ( value ) {
        return [ 'image', 'video' ].includes( value )
      }
    },
    src: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      default: null
    },
    loadDisplaySrc: {
      type: Boolean,
      default: null,
    },
    disableMediaOverlay: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    loadDisplaySrc: {
      handler ( newValue ) {
        if ( newValue ) {
          this.loadDisplayMedia()
        }
      },
      immediate: true
    },
    src ( newValue ) {
      this.activeSrc = newValue
    },
  },
  computed: {
    mediaComponent () {
      return 'z' + this.mediaType.charAt( 0 ).toUpperCase() + this.mediaType.slice( 1 )
    },
  },
  data () {
    return {
      activeSrc: this.preview || this.src,
    }
  },
  methods: {
    loadDisplayMedia () {
      switch ( this.mediaType ) {
      case 'image':
        this.loadImage( this.src )
        break
      case 'video':
        this.loadVideo( this.src )
        break
      default:
        throw TypeError( `Invalid mediaType value with ${ this.mediaType }` )
      }
    },
    loadImage ( src ) {
      const displayImage = new Image()
      displayImage.onload = () => {
        this.activeSrc = src
      }

      displayImage.src = src
    },
    loadVideo ( src ) {
      // TODO Complete video src loading
    },
    showInMediaOverlay () {
      if ( this.disableMediaOverlay ) {
        return
      }

      this.mediaViewOverlay$.show( this.src )
    },
  },
  components: {
    zImage,
    zVideo
  }
}
</script>

<style lang="scss" scoped>

</style>
