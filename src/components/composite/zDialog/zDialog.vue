<template  >
  <teleport to="body" >
    <div
      :ref="maskRef"
      :class="maskClasses"
      @click="close"
      v-if="containerVisible" >

      <transition
        name="dialog-appear"
        @enter="onEnter"
        @leave="mask.classList.remove('bg-opacity-60')"
        @after-leave="containerVisible = false"
        appear >
        <span
          v-if="visible"
          :class="windowClasses" >

          <div class="relative w-full h-full" >
            <div
              v-bind="$attrs"
              class="flex flex-col px-4 py-5 w-full h-full" >
              <div class="flex relative w-full mb-2" >
                <slot name="header" >
                </slot>
                <DialogClose @click="close" />
              </div>

              <div class="flex-grow" >
                <slot name="default" ></slot>
              </div>

              <div v-if="$slots.footer" >
                <slot name="footer" ></slot>
              </div>
            </div>

          </div>

        </span>
      </transition>

    </div>
  </teleport>
</template>

<script>
import DialogClose from './partial/DialogClose.vue'

export default {
  emits: [ 'update:visible' ],
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    modal: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      containerVisible: this.visible
    }
  },
  mask: null,
  methods: {
    maskRef ( el ) {
      this.mask = el
    },
    onEnter () {
      setTimeout( () => {
        this.mask.classList.add( 'bg-opacity-60' )
      }, 0 )
    },
    close () {
      this.$emit( 'update:visible', false )
    }
  },
  updated () {
    if ( this.visible ) {
      this.containerVisible = true
    }
  },
  computed: {
    maskClasses () {
      return [
        'overflow-y-auto fixed left-0 top-0 flex w-screen h-screen bg-black bg-opacity-0 transition-all duration-300',
        { 'pointer-events-none': !this.modal },
      ]
    },
    windowClasses () {
      return [
        'fixed right-2/4 bottom-2/4 transform translate-x-2/4 translate-y-2/4 m-auto w-5/12 h-2/4 bg-black-lighten text-white rounded-xl',
      ]
    }
  },
  components: {
    DialogClose,
  },
}
</script>

<style lang="scss" scoped>

.dialog-appear {
  &-enter-from,
  &-leave-to {
    @apply opacity-0 scale-90;
  }

  &-leave-from,
  &-enter-to {
    @apply opacity-100 scale-100;
  }

  &-enter-active,
  &-leave-active {
    @apply duration-300 origin-center;
  }
}
</style>
