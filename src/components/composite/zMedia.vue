<template >
  <div
    v-bind="wrapperAttrs"
    class="relative" >

    <component
      @click="showInOverlay"
      v-bind="attrs"
      :src="src"
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
  expose: [ 'startLoading' ],
  templateImage: require( '@images/shop/blur-template.png' ),
  props: {
    original: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      default: null
    },
    showOriginal: {
      type: Boolean,
      default: null,
    },
    disableOverlay: {
      type: Boolean,
      default: false,
    },
    autoLoading: {
      type: Boolean,
      default: true,
    },
    mediaType: {
      type: String,
      default: 'image',
      validator ( value ) {
        return [ 'image', 'video' ].includes( value )
      }
    },
  },
  data () {
    return {
      src: this.$options.templateImage,
    }
  },
  computed: {
    mediaComponent () {
      return 'z' + this.mediaType.charAt( 0 ).toUpperCase() + this.mediaType.slice( 1 )
    },
  },
  mounted () {
    if ( this.autoLoading ) {
      this.startLoading()
    }
  },
  methods: {
    startLoading () {
      if ( this.preview ) {
        this.makeWatcher()
      } else {
        this.loadOriginal()
      }
    },
    makeWatcher () {
      this.$watch(
        'showOriginal',
        async ( showOriginal ) => {
          if ( this.src !== this.preview ) {
            await this.loadImage( this.preview )
          }

          if ( showOriginal ) {
            this.loadOriginal()
          }
        },
        {
          immediate: true,
        }
      )
    },
    loadOriginal () {
      switch ( this.mediaType ) {
      case 'image':
        this.loadImage( this.original )
        break
      case 'video':
        this.loadVideo( this.original )
        break
      default:
        throw TypeError( `Invalid mediaType value with ${ this.mediaType }` )
      }
    },
    async loadImage ( src ) {
      return new Promise( ( resolve ) => {
        const displayImage = new Image()

        displayImage.onload = () => {
          resolve()
          this.src = src
        }

        displayImage.src = src
      } )
    },
    loadVideo ( src ) {
      // TODO Complete video src loading
    },
    showInOverlay () {
      if ( this.disableOverlay ) {
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
