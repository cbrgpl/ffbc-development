<template >
  <component
    v-bind="$attrs"
    :src="activeSrc"
    :is="mediaComponent" />
</template>

<script>
import zImage from '@components/atomic/zImage.vue'
import zVideo from '@components/atomic/zVideo.vue'

export default {
  name: 'zMedia',
  inheritAttrs: false,
  props: {
    mediaType: {
      type: String,
      default: 'image',
      validator ( value ) {
        return [ 'image', 'video' ].includes( value )
      }
    },
    originalSrc: {
      type: String,
      required: true,
    },
    blurSrc: {
      type: String,
      default: null
    },
    loadOriginal: {
      type: Boolean,
      default: null,
    }
  },
  watch: {
    loadOriginal: {
      handler ( newValue ) {
        if ( newValue ) {
          this.loadOriginalMedia()
        }
      },
      immediate: true
    }
  },
  computed: {
    mediaComponent () {
      return 'z' + this.mediaType.charAt( 0 ).toUpperCase() + this.mediaType.slice( 1 )
    },
  },
  data () {
    return {
      activeSrc: this.blurSrc || this.originalSrc,
    }
  },
  methods: {
    loadOriginalMedia () {
      switch ( this.mediaType ) {
      case 'image':
        this.loadImage( this.originalSrc )
        break
      case 'video':
        this.loadVideo( this.originalSrc )
        break
      default:
        throw TypeError( `Invalid mediaType value with ${ this.mediaType }` )
      }
    },
    loadImage ( src ) {
      const originalImage = new Image()
      originalImage.onload = () => {
        this.activeSrc = src
      }

      originalImage.src = src
    },
    loadVideo ( src ) {
      // hmmmm
    }
  },
  components: {
    zImage,
    zVideo
  }
}
</script>

<style lang="scss" scoped>

</style>
