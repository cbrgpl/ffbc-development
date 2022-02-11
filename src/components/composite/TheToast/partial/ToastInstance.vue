<template >
  <div
    @click="selfDestruction"
    @mouseenter="pauseInterval"
    @mouseleave="unpauseInterval"
    :class="toastClasses" >
    <div class="flex items-stretch flex-grow" >
      <div class="w-full pt-1 pb-1.5 px-2" >
        <div class="flex items-center pb-1 mb-1 border-b border-solid border-black-lightest" >
          <zIconBase
            :icon="iconName"
            class="mr-2 flex-shrink-0"
            :width="26"
            :height="26" />
          <h5 class="font-mono text-white" >
            {{ data.summary }}
          </h5>

        </div>
        <p
          v-html="data.detail"
          class="text-white text-md font-medium sm:font-normal sm:text-sm leading-tight" >
        </p>
      </div>
    </div>
    <zProgressBar
      class="h-1 bg-white bg-opacity-20"
      :progress="progress"
      :overrun="10"
      @stop="clearInterval"
      @finish="selfDestruction" />
  </div>
</template>

<script>
import zProgressBar from '@components/atomic/zProgressBar.vue'

export default {
  emits: [ 'remove' ],
  name: 'ToastInstance',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      progress: 0,
      lifeInterval: null,
      intervalPause: false,
      oldTime: null,
      lived: 0,
    }
  },
  mounted () {
    this.oldTime = Date.now()
    this.lifeInterval = setInterval( this.updateProgress, this.data.life / 50 )
  },
  computed: {
    toastSeverityClass () {
      return 'toast--' + this.data.severity
    },
    toastClasses () {
      return [
        'toast',
        this.toastSeverityClass
      ]
    },
    iconName () {
      switch ( this.data.severity ) {
      case 'warning': return 'warning'
      case 'success': return 'success'
      case 'error': return 'error'
      default: return 'message'
      }
    },
  },
  methods: {
    updateProgress ( currentTime = Date.now() ) {
      if ( this.intervalPause ) {
        return
      }

      this.lived += currentTime - this.oldTime
      this.oldTime = currentTime

      const life = this.data.life
      this.progress = this.lived / life * 100
    },
    pauseInterval () {
      this.intervalPause = true
    },
    unpauseInterval () {
      this.oldTime = Date.now()
      this.intervalPause = false
    },
    selfDestruction () {
      this.clearInterval()
      this.$emit( 'remove', this.data.id )
    },
    clearInterval () {
      if ( this.lifeInterval ) clearInterval( this.lifeInterval )
    }
  },
  components: {
    zProgressBar,
  },
}
</script>

<style lang="scss" scoped>
.toast {
  @apply flex flex-col bg-black w-full border-2 border-b-0 border-solid border-white border-opacity-20
    rounded-md overflow-hidden pointer-events-auto select-none cursor-pointer;

  &--info {
    @apply text-primary-lightest;
  }

  &--warning {
    @apply text-secondary;
  }

  &--error {
    @apply text-danger;
  }

  &--success {
    @apply text-safety;
  }
}

</style>
