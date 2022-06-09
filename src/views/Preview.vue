<template >
  <div class="relative flex-col p-3" >
    <div class="flex w-full flex-wrap" >
      <div
        v-for="i of 120"
        :key="i"
        class="w-1/4 h-32 bg-white mb-2 border border-solid border-black-lightest"
        v-observable ></div>
    </div>

    <zButton @click="resetReactiveObserver" >
      reset
    </zButton>
  </div>
</template>

<script>
import { ReactiveObserver } from '@/helpers/modules/reactiveObserver'

const reactiveObserver = new ReactiveObserver()

export default {
  reactiveObserver,
  data () {
    return {
      bufferItems: 0,
    }
  },
  mounted () {
    const $shopRoot = document.querySelector( '#shop-root-content' )
    this.$options.reactiveObserver.init( $shopRoot )
  },
  methods: {
    resetReactiveObserver () {
      this.$options.reactiveObserver.reset()
    }
  },
  directives: {
    observable: reactiveObserver.observableDirective
  }
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  @apply h-64 w-full relative;
  clip-path: inset(0);

  &::after {
    @apply absolute z-20 w-full h-full;
    content: "";
  }
}

.preview__image {
  @apply z-10;
}
</style>
