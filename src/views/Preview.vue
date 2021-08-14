<template >
  <div >

    <zButton @click="info" >
      info
    </zButton>

    <zButton @click="error" >
      error
    </zButton>

    <zButton @click="success" >
      success
    </zButton>

    <zButton @click="warning" >
      warning
    </zButton>

    <zDialog
      @update:visible="test"
      v-model:visible="visible" >
      <template #header >
        header
      </template>

      default

      <template #footer >
        footer
      </template>
    </zDialog>
  </div>
</template>

<script>
import observer from '@directives/observer.directive.js'

import zButton from '@/components/atomic/zButton.vue'
import zDialog from '@/components/composite/zDialog/zDialog.vue'

export default {
  directives: {
    observer,
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    info () {
      this.toast$.info( { detail: 'Yuo have been completed that shift', summary: 'Completed!' } )
    },
    success () {
      this.toast$.success( { detail: 'Succes status was gotten from the server', summary: 'Success completed!' } )
    },
    error () {
      this.toast$.error( { detail: 'Error while handling', summary: 'Oh, something went wrong' } )
    },
    warning () {
      this.toast$.warn( { detail: 'Be careful', summary: 'Oh, be careful with that shit it is not looks like' } )
    },
  },
  components: {
    zDialog,
    zButton
  },
}
</script>

<style lang="scss" scoped>

.image-wrapper {
  clip-path: inset(0);

  @apply h-64 w-full relative;

  &::after {
    content: '';

    @apply absolute z-20 w-full h-full;
  }
}

.preview__image {
  @apply z-10;
}
</style>
