<template  >
  <teleport to="body" >
    <div
      :ref="maskRef"
      :style="maskStyles"
      :class="maskClasses"
      @click="disappear"
      @keyup.esc="disappear" >

      <transition
        name="dialog-appear"
        @enter="onEnter"
        @leave="mask.classList.remove('bg-opacity-60')"
        @after-leave="closeDialog"
        appear >
        <span
          v-if="dialogVisible"
          role='dialog'
          @click.stop
          :class="['dialog__window', {'border border-white border-opacity-20 border-solid': !modal}]"
          v-bind="$attrs" >

          <div class="relative w-full h-full" >
            <div
              class="flex flex-col w-full h-full" >
              <div
                class="flex relative w-full mb-2" >
                <slot name="header" >
                </slot>
                <DialogClose @click="disappear" />
              </div>

              <div class="flex-grow flex flex-col justify-center items-center" >
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
import getZIndex from '@functions/getZIndex.function.js'

export default {
  name: 'Dialog',
  inheritAttrs: false,
  emits: [ 'update:visible' ],
  mask: null,
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
      dialogVisible: this.visible,
      zIndex: getZIndex(),
    }
  },
  computed: {
    maskClasses () {
      return [
        'overflow-y-auto fixed z-30 left-0 top-0 flex w-screen h-screen bg-black bg-opacity-0 transition-all duration-300',
        { 'pointer-events-none': !this.modal },
      ]
    },
    maskStyles () {
      return {
        background: !this.modal ? 'transparent' : ''
      }
    }
  },
  methods: {
    maskRef ( el ) {
      this.mask = el
    },
    onEnter () {
      setTimeout( () => {
        this.mask.classList.add( 'bg-opacity-60' )
      }, 0 )
    },
    disappear () {
      this.dialogVisible = false
    },
    closeDialog () {
      this.$emit( 'update:visible', false )
    }
  },

  components: {
    DialogClose,
  },
}
</script>

<style lang="scss" scoped>
.dialog__window {
  @apply fixed right-2/4 bottom-2/4 transform translate-x-2/4 translate-y-2/4 m-auto pointer-events-auto
    bg-black-lighten text-white rounded-xl px-4 py-5;
}

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
