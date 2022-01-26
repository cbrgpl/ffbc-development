<template >
  <div
    :ref="setTranslateDelta"
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
  computed: {
    totalTranslated () {
      return this.translateDelta * this.activeElement
    },
    stripTranslateStyle () {
      return {
        transform: `translateX(-${ this.totalTranslated }px)`
      }
    }
  },
  methods: {
    setTranslateDelta ( $visibleContainer ) {
      if ( $visibleContainer ) {
        setTimeout( () => {
          this.translateDelta = parseFloat( window.getComputedStyle( $visibleContainer ).width )
        }, 0 )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-strip > div {
  @apply flex-shrink-0;
}
</style>
