<template >
  <span
    :ref="setWrapperWidth"
    class="w-full overflow-hidden bg-black-lightest" >
    <div
      @transitionend="emitFinish"
      ref="bar"
      :style="barStyles"
      class="progress-bar__progress w-0 h-full bg-current" ></div>
  </span>
</template>

<script>
import { ErrorWithDescription } from '@errors'

export default {
  emits: [ 'finished' ],
  name: 'zProgressBar',
  props: {
    progress: {
      type: Number,
      required: true,
    },
    animationPaused: {
      type: Boolean,
      default: false,
    },
    durationMs: {
      type: Number,
      required: true,
    }
  },
  data () {
    return {
      barWidth: 0,
      wrapperWidth: 0,
      duration: this.durationMs,
    }
  },
  computed: {
    barStyles () {
      return {
        width: this.barWidth + '%',
        transitionDuration: `${ this.duration }ms`
      }
    }
  },
  watch: {
    progress: {
      handler ( newValue ) {
        if ( !this.validateProgress( newValue ) ) {
          throw new ErrorWithDescription( `Invalid progress prop value "${ this.progress }"` )
        }

        setTimeout( () => {
          this.barWidth = this.progress
        }, 0 )
      },
      immediate: true,
    },
    animationPaused ( newValue ) {
      if ( newValue ) {
        this.pauseBarAnimation()
      } else {
        this.continueBarAnimation()
      }
    }
  },
  methods: {
    validateProgress: ( progress ) => progress >= 0 && progress <= 100,
    pauseBarAnimation () {
      this.barWidth = this.getBarPercentWidth()
      this.duration = this.updateDuration( this.barWidth )
    },
    getBarPercentWidth () {
      const barWidth = this.getBarWidth()

      return ( barWidth / this.wrapperWidth ).toFixed( 2 ) * 100
    },
    getBarWidth () {
      const barClientRect = this.$refs.bar.getBoundingClientRect()
      return barClientRect.width.toFixed( 2 )
    },
    updateDuration ( percentWidthOnPause ) {
      const passedTime = Math.round( this.durationMs * ( percentWidthOnPause / 100 ) )
      const remainingTime = this.durationMs - passedTime
      return remainingTime
    },
    continueBarAnimation () {
      this.barWidth = this.progress
    },
    setWrapperWidth ( $el ) {
      if ( $el ) {
        this.wrapperWidth = $el.getBoundingClientRect().width
      }
    },
    emitFinish () {
      this.$emit( 'finished' )
    }
  },
}
</script>

<style lang="scss" scoped>
.progress-bar__progress {
  transition-timing-function: linear;
  transition-property: width;
}

</style>
