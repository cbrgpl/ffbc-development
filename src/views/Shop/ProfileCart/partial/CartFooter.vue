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
      :disabled="cartCalculationEmpty"
      @click="$emit('buy')"
      class="px-12 py-3.5"
      variant="safety" >
      Buy Selected
    </zButton>
  </div>
</template>

<script>
export default {
  name: 'CartFooter',
  emits: [ 'buy' ],
  props: {
    cartCalculation: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cartCalculationEmpty () {
      return this.cartCalculation.qnt === 0
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
