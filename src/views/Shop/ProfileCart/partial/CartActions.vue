<template >
  <div class="w-full flex justify-between py-3 border-b boder-white border-opacity-40 border-solid" >
    <zCheckboxSingle
      class="py-2"
      :checked="!selectedProductsEmpty"
      @update:modelValue="$emit('toggleAllProducts')"
      label="Select All" />

    <transition name="delete-button" >
      <zButton
        v-if="!selectedProductsEmpty"
        @click="$emit('deleteProducts')"
        variant="danger"
        class="px-6" >
        Delete
      </zButton>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'CartActions',
  props: {
    selectedProductsEmpty: {
      type: Boolean,
      required: true,
    }
  },
  emits: [ 'toggleAllProducts', 'deleteProducts' ],
}
</script>

<style lang="scss" scoped>
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
