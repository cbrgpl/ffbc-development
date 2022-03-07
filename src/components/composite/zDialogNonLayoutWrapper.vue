<template >
  <zDialog
    v-if="visible"
    :visible="visible"
    @update:visible="selfClose" >
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
  </zDialog>
</template>

<script>
import zDialog from '@components/composite/zDialog/zDialog'

export default {
  name: 'zDialogList',
  emits: [ 'update:visible' ],
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: [ String ],
      default: null
    },
  },
  methods: {
    selfClose () {
      this.$emit( 'update:visible', false )
    }
  },
  components: {
    zDialog
  }
}
</script>

<style lang="scss" scoped>
</style>
