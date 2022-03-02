<template >
  <component
    :src="activeSrc"
    @click="showInMediaOverlay"
    :is="mediaComponent" />
</template>

<script>
import zImage from '@components/atomic/zImage.vue'
import zVideo from '@components/atomic/zVideo.vue'

export default {
  name: 'zMedia',
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
    }
  },
  watch: {
    loadDisplaySrc: {
      handler ( newValue ) {
        if ( newValue ) {
          this.loadDisplayMedia()
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
      // hmmmm
    },
    showInMediaOverlay () {
      const mediaSrc = this.src

      this.mediaViewOverlay$.show( mediaSrc )
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
