<template >
  <transition name="overlay-appear" >
    <div
      @click="closeMediaOverlay"
      v-if="overlayVisibility"
      class="fixed z-110 left-0 top-0 flex w-screen h-screen bg-black bg-opacity-80 transition-all duration-300" >
      <div
        @click.stop
        class="relative w-full max-w-3xl m-auto" >
        <zMedia
          class="media transition-opacity duration-300"
          :media-type="mediaInfo.type"
          :original-src="mediaInfo.src" />

        <CloseIcon
          @click="closeMediaOverlay"
          class="absolute right-2 top-2" />
      </div>
    </div>
  </transition>
</template>

<script>
import CloseIcon from './partial/CloseIcon.vue'

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
    closeMediaOverlay () {
      this.mediaViewOverlay$.resetActiveMediaInfo()
    }
  },
  components: {
    CloseIcon,
  }
}
</script>

<style lang="scss" scoped>
.overlay-appear {
  &-enter-from,
  &-leave-to {
    @apply bg-opacity-0;

    opacity: 0;
  }

  &-leave-from,
  &-enter-to {
    @apply bg-opacity-80;

    opacity: 1;
  }

  &-enter-active,
  &-leave-active {
    @apply duration-300 origin-center;
  }
}
</style>
