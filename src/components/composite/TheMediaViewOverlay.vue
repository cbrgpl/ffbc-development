<template >
  <transition name="overlay-appear" >
    <div
      @click="resetMediaInfo"
      v-if="overlayVisibility"
      class="fixed z-30 left-0 top-0 flex w-screen h-screen bg-black bg-opacity-80 transition-all duration-300" >
      <div
        @click.stop
        class="w-full max-w-3xl m-auto" >
        <zMedia
          class="media transition-opacity duration-300"
          :media-type="mediaInfo.type"
          :original-src="mediaInfo.src" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheMediaViewOverlay',
  computed: {
    mediaInfo () {
      return this.mediaViewOverlay$.getActiveMediaInfo().value
    },
    overlayVisibility () {
      return this.mediaInfo !== null
    }
  },
  methods: {
    resetMediaInfo () {
      this.mediaViewOverlay$.resetActiveMediaInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay-appear {
  &-enter-from,
  &-leave-to {
    @apply bg-opacity-0;

    .media {
      opacity: 0;
    }
  }

  &-leave-from,
  &-enter-to {
    @apply bg-opacity-80;

    .media {
      opacity: 1;
    }
  }

  &-enter-active,
  &-leave-active {
    @apply duration-300 origin-center;
  }
}
</style>
