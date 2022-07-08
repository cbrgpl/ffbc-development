<template >
  <zDialog
    v-if="visible"
    :visible="visible"
    :remove-buffer="fakeRemoveBuffer"
    :name="fakeName"
    @close="selfClose" >
    <template #header >
      <slot name="title" >
        <h5
          v-if="title !== null"
          class="md:text-lg font-mono" >
          {{ title }}
        </h5>
      </slot>
    </template>

    <zDivider
      v-if="titleProvided"
      class="mb-2" />

    <div class="flex flex-col" >
      <slot />
    </div>
  </zDialog>
</template>

<script >
import zDialog from '@general_components/composite/zDialog/zDialog'

import escCloseMix from '@/helpers/mixins/escClose.mixin'

export default {
  name: 'ZDialogList',
  components: {
    zDialog
  },
  mixins: [ escCloseMix ],
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
  emits: [ 'update:visible' ],
  data () {
    return {
      fakeRemoveBuffer: [],
      fakeName: 'fake-name'
    }
  },
  computed: {
    titleProvided () {
      return this.title !== null || !!this.$slots.title
    }
  },
  methods: {
    selfClose () {
      this.$emit( 'update:visible', false )
    },
    closeFn () {
      this.fakeRemoveBuffer.push( this.fakeName )
    }
  }
}
</script>

<style lang="scss" scoped >
</style>
