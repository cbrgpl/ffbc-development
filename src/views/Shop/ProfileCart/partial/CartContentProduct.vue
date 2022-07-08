<template >
  <zProfileProduct ref="profileProduct" >
    <template #actions >
      <zCheckboxSingle
        :checked="selected"
        @update:modelValue="toggleSelectState" />
    </template>
  </zProfileProduct>
</template>

<script >
import zProfileProduct from '@shop_components/composite/zProfileProduct.vue'

export default {
  name: 'CartContentProduct',
  components: {
    zProfileProduct,
  },
  inject: [ 'selectedIds' ],
  props: {
    cartItemId: {
      type: Number,
      required: true,
    },
  },
  emits: [ 'toggleSelectState' ],
  expose: [ 'startMediaLoading' ],
  computed: {
    selected () {
      return this.selectedIds.value.includes( this.cartItemId )
    }
  },
  methods: {
    toggleSelectState () {
      this.$emit( 'toggleSelectState', this.cartItemId )
    },
    startMediaLoading () {
      this.$refs.profileProduct.startMediaLoading()
    }
  }
}
</script>
<style lang="scss" scoped >

</style>
