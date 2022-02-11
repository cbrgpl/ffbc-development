<template >
  <div
    ref="strip-wrapper"
    class="content-strip overflow-hidden" >

    <div
      :style="stripTranslateStyle"
      class="h-full flex flex-nowrap transition-transform duration-300 ease-out" >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentStrip',
  props: {
    activeElement: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      translateDelta: 0,
    }
  },
  mounted () {
    this.updateTranslateDelta()
    this.setResizeEvent( this.onResizeHandler )
  },
  beforeDestroy () {
    this.removeResizeEvent( this.onResizeHandler )
  },
  computed: {
    translatedDistance () {
      return this.translateDelta * this.activeElement
    },
    stripTranslateStyle () {
      return {
        transform: `translateX(-${ this.translatedDistance }px)`
      }
    }
  },
  methods: {
    updateTranslateDelta () {
      const $strip = this.$refs[ 'strip-wrapper' ]

      this.setTranslateDelta( $strip )
    },
    setTranslateDelta ( $strip ) {
      if ( $strip ) {
        setTimeout( () => {
          this.translateDelta = parseFloat( window.getComputedStyle( $strip ).width )
        }, 0 )
      }
    },
    onResizeHandler ( event ) {
      this.updateTranslateDelta()
    },
    setResizeEvent ( callback ) {
      window.addEventListener( 'resize', callback )
    },
    removeResizeEvent ( callback ) {
      window.removeEventListener( 'resize', callback )
    }
  }
}
</script>

<style lang="scss" scoped>
.content-strip > div {
  @apply flex-shrink-0;
}
</style>
