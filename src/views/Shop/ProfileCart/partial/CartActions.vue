<template >
  <div class="w-full flex justify-between py-3 border-b boder-white border-opacity-40 border-solid" >
    <zCheckboxSingle
      class="py-2"
      :checked="!noSelectedItems"
      label="Select All"
      @update:modelValue="$emit('toggleAllSelectStates')" />

    <transition name="delete-button" >
      <zLoaderButton
        v-if="!noSelectedItems"
        :loader="actionsDisabled"
        variant="danger"
        class="px-6"
        @click="$emit('deleteProducts')" >
        Delete
      </zLoaderButton>
    </transition>
  </div>
</template>

<script >

export default {
  name: 'CartActions',
  inject: [ 'actionsDisabled' ],
  props: {
    noSelectedItems: {
      type: Boolean,
      required: true,
    },
  },
  emits: [ 'toggleAllSelectStates', 'deleteProducts' ],
}
</script>

<style lang="scss" scoped >
.delete-button {
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }

  &-leave-from,
  &-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  &-leave-active,
  &-enter-active {
    transition:
      opacity 160ms ease-out,
      transform 160ms ease-in;
  }
}
</style>
