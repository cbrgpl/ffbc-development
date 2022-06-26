<template >
  <zProfileProduct >
    <template #actions >
      <zCheckboxSingle
        :checked="selected"
        @update:modelValue="toggleSelectState" />
    </template>
  </zProfileProduct>
</template>

<script>
import zProfileProduct from '@shop_components/composite/zProfileProduct.vue'

export default {
  name: 'CartContentProduct',
  emits: [ 'toggleSelectState' ],
  inject: [ 'selectedIds' ],
  props: {
    cartItemId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    selected () {
      return this.selectedIds.value.includes( this.cartItemId )
    }
  },
  methods: {
    toggleSelectState () {
      this.$emit( 'toggleSelectState', this.cartItemId )
    }
  },
  components: {
    zProfileProduct,
  }
}
</script>
<style lang="scss" scoped>

</style>
