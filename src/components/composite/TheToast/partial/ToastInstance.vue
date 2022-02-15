<template >
  <div
    @click="destroySelf"
    @mouseenter="pauseProgressAnimation"
    @mouseleave="continueProgressAnimation"
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
      :progress="100"
      :animation-paused="progressAnimationPaused"
      :duration-ms="data.life"
      @finished="destroySelf" />
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
      progressAnimationPaused: false,
    }
  },
  computed: {
    toastSeverityClass () {
      return 'toast--' + this.data.toastType
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
    pauseProgressAnimation ( ) {
      this.progressAnimationPaused = true
    },
    continueProgressAnimation () {
      this.progressAnimationPaused = false
    },
    destroySelf () {
      this.$emit( 'remove', this.data.id )
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
