<template >
  <div
    ref="wrapper"
    :class="['wrapper', 'w-full', ...wrapperClasses]" >
    <div
      ref="content"
      :style="contentVars"
      :class="['inline-flex whitespace-nowrap py-0.5', ...contentClasses]" >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'zTape',
  props: {
    scrollable: {
      type: Boolean,
      default: false
    },
    autoScrollingSpeed: { // px / sec
      type: Number,
      default: 0.0375
    },
    setDefaultTranslate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      autoScrollingDuration: 999999,
      positiveTranslate: 0,
    }
  },
  computed: {
    wrapperClasses () {
      return this.scrollable
        ? [ 'overflow-x-auto' ]
        : [ 'overflow-x-hidden' ]
    },
    contentClasses () {
      return this.scrollable
        ? []
        : [
          'auto-scrolling',
          this.setDefaultTranslate ? 'auto-scrolling--automated' : 'auto-scrolling--usermated'
        ]
    },
    contentVars () {
      return {
        '--play-state-no-hover': this.setDefaultTranslate ? '' : 'paused',
        '--play-state-hover': this.setDefaultTranslate ? 'paused' : '',
        '--auto-scrolling-duration': this.autoScrollingDuration,
        '--positive-translate': this.positiveTranslate
      }
    }
  },
  mounted () {
    this.setAutoScrollingDuration( this.$refs.wrapper, this.$refs.content )
    if ( this.setDefaultTranslate ) {
      this.setPositiveTranslate( this.$refs.wrapper )
    }
  },
  methods: {
    setAutoScrollingDuration ( $wrapper, $content ) {
      if ( $wrapper.offsetWidth < $content.offsetWidth ) {
        this.autoScrollingDuration = $content.offsetWidth / this.autoScrollingSpeed + 'ms'
      }
    },
    setPositiveTranslate ( $wrapper ) {
      this.positiveTranslate = $wrapper.offsetWidth + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes auto-scrolling {
  0% {
    transform: translateX(var(--positive-translate));
  }

  100% {
    transform: translateX(calc(-100% - 10vw));
  }
}
//   animation-play-state: var(--play-state-no-hover);

//   &:hover {
//     animation-play-state: var(--play-state-hover);
//   }
// }

.wrapper:hover {
  .auto-scrolling--automated {
    animation-play-state: paused;
  }

  .auto-scrolling--usermated {
    animation: auto-scrolling var(--auto-scrolling-duration) linear infinite;
  }
}

.auto-scrolling--automated {
  animation: auto-scrolling var(--auto-scrolling-duration) linear infinite;
}// .auto-scrolling {
</style>
