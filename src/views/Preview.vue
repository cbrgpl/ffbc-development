<template >
  <div >

    <zButton @click="test" >
      Turn on
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
    test ( $ev ) {
      this.dialog$.show( 'auth' )
    }
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
