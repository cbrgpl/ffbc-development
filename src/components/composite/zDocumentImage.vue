<template >
  <zImage >
    <template #actions >
      <div
        @click.stop
        class="z-documents-image__actions" >
        <zActionButton
          class="z-documents-image__action"
          :is-title="true"
          title="Remove Image"
          icon-name="close" />
      </div>
    </template>
  </zImage>
</template>

<script>
import zImage from '@components/atomic/zImage.vue'

export default {
  name: 'zDocumentImage',
  components: {
    zImage,
  }
}
</script>

<style lang="scss" scoped>
.z-documents-image__actions {
  display: flex;
  align-items: center;
}

.z-documents-image__action {
  cursor: default;
}

</style>
