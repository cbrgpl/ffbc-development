<template >
  <zDialog >
    <template #header >
      Authentification header
    </template>

    Authentification
  </zDialog>
</template>

<script>
import zDialog from '@components/composite/zDialog/zDialog.vue'

export default {
  name: 'auth-dialog',
  components: {
    zDialog,
  },
}
</script>

<style lang="scss" scoped>

</style>
