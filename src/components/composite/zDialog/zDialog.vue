<template  >
  <teleport to="body" >
    <div
      ref="mask"
      :style="dialogZIndex"
      :class="['dialog__mask', maskOverlowClass]"
      @click="hideWindow" >

      <Transition
        :name="appearAnimation"
        @enter="animateMaskAppear"
        @leave="animateMaskDisappear"
        appear >
        <span
          v-if="windowVisible"
          role='dialog'
          @click.stop
          :class="['dialog__window px-4 py-5', windowPositionClass]"
          v-bind="$attrs" >

          <div class="relative w-full h-full" >
            <div
              class="flex flex-col w-full h-full" >
              <div
                class="flex relative w-full mb-2" >
                <slot name="header" />
                <DialogClose @click="hideWindow" />
              </div>

              <div class="flex-grow" >
                <slot name="default" />
              </div>

              <div v-if="$slots.footer" >
                <slot name="footer" />
              </div>
            </div>

          </div>

        </span>
      </Transition>
    </div>
  </teleport>
</template>

<script>
import DialogClose from './partial/DialogClose.vue'
import getZIndex from '@functions/getZIndex.function.js'

export default {
  name: 'Dialog',
  inheritAttrs: false,
  emits: [ 'close' ],
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    position: {
      type: String,
      default: 'center',
      validator ( val ) {
        return [ 'top', 'center', 'bottom' ].includes( val )
      }
    },
    removeBuffer: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  watch: {
    removeBuffer: {
      handler ( newValue ) {
        if ( newValue.includes( this.name ) ) {
          this.hideWindow()
        }
      },
      deep: true,
    }
  },
  data () {
    return {
      windowVisible: this.visible,
    }
  },
  computed: {
    windowPositionClass () {
      return 'dialog__window_' + this.position
    },
    maskOverlowClass () {
      return this.position === 'center' ? 'overflow-auto' : 'overflow-hidden'
    },
    appearAnimation () {
      return 'appear_' + this.position
    },
    dialogZIndex () {
      const defaultDialogZIndex = 1000

      return {
        zIndex: defaultDialogZIndex + getZIndex()
      }
    }
  },
  methods: {
    animateMaskAppear () {
      setTimeout( () => {
        this.$refs.mask.classList.add( 'dialog__mask_visbile' )
      }, 0 )
    },
    animateMaskDisappear () {
      const mask = this.$refs.mask

      this.addOnceTransitionendListener( mask )

      mask.classList.remove( 'dialog__mask_visbile' )
    },
    addOnceTransitionendListener ( mask ) {
      mask.addEventListener( 'transitionend', ( event ) => {
        if ( mask === event.target ) {
          this.emitCloseDialog()
        }
      } )
    },
    hideWindow () {
      this.windowVisible = false
    },
    emitCloseDialog () {
      this.$emit( 'close', this.name )
    }
  },
  components: {
    DialogClose,
  },
}
</script>

<style lang="scss" scoped>
.dialog__mask {
  @apply fixed left-0 top-0 flex w-screen h-screen bg-black bg-opacity-0 transition-all duration-300;
}

.dialog__mask_visbile {
  @apply bg-opacity-60;
}

.dialog__window {
  @apply mx-auto pointer-events-auto
    bg-black-lighten text-white rounded-xl;
}

.dialog__window_top {
  @apply origin-top mb-auto lg:m-auto;
}

.dialog__window_center {
  @apply origin-center m-auto;
}

.dialog__window_bottom {
  @apply origin-bottom mt-auto lg:m-auto;
}

.appear_top {
  &-enter-from {
    opacity: 0;
    transform: translateY(-10px)
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(-25px);
  }

  &-leave-from,
  &-enter-to {
    opacity: 1;
    transform: translateY(0)
  }

  &-leave-active {
    transition:
      opacity 160ms,
      transform 200ms ease-in-out;
  }

  &-enter-active {
    transition:
      opacity 160ms,
      transform 150ms ease-out;
  }
}

.appear_bottom {
  &-enter-from {
    opacity: 0;
    transform: translateY(10px)
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(25px);
  }

  &-leave-from,
  &-enter-to {
    opacity: 1;
    transform: translateY(0)
  }

  &-leave-active {
    transition:
      opacity 160ms,
      transform 200ms ease-in-out;
  }

  &-enter-active {
    transition:
      opacity 160ms,
      transform 150ms ease-out;
  }
}

.appear_center {
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
    @apply duration-200;
  }
}

</style>
