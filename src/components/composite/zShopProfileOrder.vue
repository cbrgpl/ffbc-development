<template >
  <div class="bg-black-lighten border border-solid border-white rounded-md px-3 py-4" >

    <div >
      <h3 > {{ order.title }} </h3>
      <h5 class="font-mono tracking-widest leading-none" >
        {{ order.id }}
      </h5>
    </div>

    <zDivider class="my-3.5" />

    <div class="flex w-full h-80 xl:h-72 overflow-x-auto select-none" >
      <zMediaWithTitle
        v-for="media of order.media"
        :key="media.display"
        title="A Media of product"
        class="mr-2 flex-shrink-0 h-full max-w-full w-auto last:mr-0"
        :src="media.display" />
    </div>

    <zDivider class="my-3.5" />

    <div class="flex flex-col items-stretch sm:flex-row sm:items-center justify-between" >

      <zShopOrderStatus
        class="mb-1.5"
        :status-id="order.status" />

      <zButton
        class="px-8 py-3"
        @click="emitOpenOrderDetail" >
        Detail
      </zButton>
    </div>
  </div>
</template>

<script>
import zShopOrderStatus from '@components/atomic/zShopOrderStatus.vue'

export default {
  name: 'zShopProfileOrder',
  emits: [ 'open-order-detail' ],
  props: {
    order: {
      type: Object,
      required: true,
    }
  },
  methods: {
    emitOpenOrderDetail () {
      this.$emit( 'open-order-detail', this.order.id )
    }
  },
  components: {
    zShopOrderStatus
  }
}
</script>

<style lang="scss" scoped>

</style>
