<template >
  <teleport to='body' >
    <div
      v-if="maskVisible"
      @click="hideListWindow"
      ref="mask"
      class="mask w-screen h-screen fixed top-0 left-0 flex bg-black bg-opacity-0 transition-colors duration-200 text-white" >

      <transition
        name="list-appear"
        @enter="addMaskBgOpacity"
        @leave="removeMaskBgOpacity"
        @after-leave="hideDialogList"
        appear >
        <div
          v-if="listWindowVisible"
          v-bind="$attrs"
          @click.stop
          class="w-screen max-h-72 max-w-md mt-auto xl:my-auto mx-auto rounded-t-md xl:rounded-md bg-black-lighten select-none px-3.5 py-3" >
          <slot name="title" >
            <h5
              v-if="title !== null"
              class="mb-2 md:text-lg font-mono" >
              {{ title }}
            </h5>
          </slot>
          <div class="flex flex-col" >
            <slot />
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'zDialogList',
  emits: [ 'update:visible' ],
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: [ String ],
      default: null
    }
  },
  watch: {
    visible ( newValue ) {
      if ( newValue ) {
        this.showDialogList()
      } else {
        this.hideListWindow()
      }
    },
    maskVisible ( newValue ) {
      if ( !newValue && this.visible ) {
        this.$emit( 'update:visible', false )
      }
    }
  },
  data () {
    return {
      listWindowVisible: false,
      maskVisible: false
    }
  },
  methods: {
    showDialogList () {
      this.maskVisible = true
      setTimeout( () => {
        this.showListWindow()
      }, 0 )
    },
    hideDialogList () {
      this.maskVisible = false
    },
    showListWindow () {
      this.listWindowVisible = true
    },
    hideListWindow () {
      this.listWindowVisible = false
    },
    addMaskBgOpacity () {
      this.$refs.mask.classList.add( 'bg-opacity-50' )
    },
    removeMaskBgOpacity () {
      this.$refs.mask.classList.remove( 'bg-opacity-50' )
    },
  }
}
</script>

<style lang="scss" scoped>
.mask {
  z-index: 101;
}

.list-appear {
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
</style>
