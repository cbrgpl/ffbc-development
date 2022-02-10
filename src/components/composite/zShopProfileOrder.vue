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
        :key="media"
        title="A Media of product"
        class="mr-2 flex-shrink-0 h-full max-w-full w-auto last:mr-0"
        :original-src="media" />
    </div>

    <zDivider class="my-3.5" />

    <div class="flex flex-col items-stretch sm:flex-row sm:items-center justify-between" >
      <h5 :class="['inline-flex text-lg sm:font-semibold mb-1.5', chipClasses]" >
        {{ order.status }}
      </h5>

      <zButton
        class="px-8 py-3"
        @click="routeToOrderDetail" >
        Detail
      </zButton>
    </div>
  </div>
</template>

<script>
import orderStatusClasses from '@/enums/info/orderStatusClasses'

export default {
  name: 'zShopProfileOrder',
  props: {
    order: {
      type: Object,
      required: true,
    }
  },
  methods: {
    routeToOrderDetail () {
      console.log( 'to order detail...' )
    }
  },
  computed: {
    chipClasses () {
      return orderStatusClasses[ this.order.status ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
