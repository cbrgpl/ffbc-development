<template >
  <teleport to="body" >
    <div class="toast-container w-full sm:w-80 px-3 sm:px-0 h-full fixed top-2 right-0 sm:right-3 pointer-events-none" >
      <div class="w-full relative" >
        <transition-group name="toast-animation" >
          <ToastInstance
            v-for="toast of toastList"

            :key="toast.id"
            :style="toastCusomStyles"

            :data="toast"

            @remove="removeToast" />
        </transition-group>
      </div>
    </div>
  </teleport>
</template>

<script >
import ToastInstance from './partial/ToastInstance.vue'

export default {
  name: 'TheToast',
  components: {
    ToastInstance,
  },
  data () {
    return {
      toastMargin: 15,
    }
  },
  computed: {
    toastList () {
      return this.toast$.getToastList()
    },
    toastCusomStyles () {
      return {
        marginBottom: this.toastMargin + 'px',
      }
    },
  },
  methods: {
    removeToast ( id ) {
      this.toast$.remove( id )
    },
  },
}
</script>

<style lang="scss" scoped >
.toast-container {
  z-index: 999999;
}

.toast-animation {
  &-enter-active {
    @apply transform-gpu duration-200 transition-all ease-in;
  }

  &-enter-from {
    @apply translate-y-4 opacity-0;
  }

  &-enter-to {
    @apply translate-y-0 opacity-100;
  }

  &-leave-active {
    @apply transform-gpu duration-300 origin-right ease-out;

    position: absolute;
  }

  &-leave-to {
    @apply -translate-y-8 opacity-0;
  }

  &-move {
    @apply transition-all duration-500 ease-out;
  }
}
</style>
