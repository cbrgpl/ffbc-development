<template >
  <div class="relative" >
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

    <zButton @click="dialog$.show('registration', false)" >
      warning
    </zButton>

    <zLoader
      title
      background
      size="42" ></zLoader>

    <zLoaderButton
      class="px-6 py-3.5 mt-3"
      :loader="true" >
      Dimochka
    </zLoaderButton>

  </div>
</template>

<script>
import observer from '@directives/observer.directive.js'

import zButton from '@/components/atomic/zButton.vue'
import zDialog from '@/components/composite/zDialog/zDialog.vue'

import NetworkAttemptErorr from '@errors/networkAttemptError'

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
      throw new NetworkAttemptErorr( 'api/url', { body: 1, attempt: 1 }, 501 )
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
