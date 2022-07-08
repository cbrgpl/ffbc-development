<template >
  <div class="flex flex-col sm:flex-row justify-between w-full bg-black-lighten boder-t border-placeholder border-opacity-40 border-solid py-2" >
    <div class="text-white mb-3 sm:mb-0" >
      <div class="mb-2" >
        <u class="text-placeholder" >
          Calculated price:
        </u>
        &nbsp;
        <small class="text-base font-semibold" >
          ${{ cartCalculation.price }}
        </small>
      </div>
      <div >
        <u class="text-placeholder" >
          Quantity:
        </u>
        &nbsp;
        <small class="text-base font-semibold" >
          {{ cartCalculation.qnt }}
        </small>
      </div>
    </div>

    <zButton
      :disabled="actionsDisabled.value"
      class="px-12 py-3.5"
      variant="safety"
      @click="$emit('buy')" >
      Buy Selected
    </zButton>
  </div>
</template>

<script >
export default {
  name: 'CartFooter',
  inject: [ 'actionsDisabled' ],
  props: {
    selectedItems: {
      type: Object,
      required: true,
    },
  },
  emits: [ 'buy' ],
  computed: {
    cartCalculation () {
      const cartCalculation = {
        qnt: 0,
        price: 0,
      }

      for ( const cartItem of this.selectedItems ) {
        cartCalculation.qnt++
        cartCalculation.price += parseFloat( cartItem.price )
      }

      return cartCalculation
    },
  }
}
</script>

<style lang="scss" scoped >

</style>
