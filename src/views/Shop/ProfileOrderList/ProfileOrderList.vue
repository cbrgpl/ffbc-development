<template >
  <div class="relative" >
    <div
      v-if="loader"
      class="absolute left-0 top-0 w-full h-full z-140" >
      <zLoader
        size="200px"
        background
        title />

    </div>

    <div
      ref="scrollableContainer"
      class="h-full w-full overflow-y-auto flex flex-col shop-main_padding" >
      <zPseudoSelect
        class="md:w-72"
        @click="showCategoriesList"
        title="Show" >
        {{ selectedOrderCategory }}
      </zPseudoSelect>

      <div class="mt-3 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-y-5 md:gap-4 2xl:gap-y-8" >

        <zShopProfileOrder
          :key="order.id"
          v-for="(order, i) of orderList"
          @open-order-detail="openOrderDetail"
          :order="order"
          v-observable="i"
          :intersected="$options.reactiveObserver.schema[i]" />
      </div>

      <zDialogNonLayoutWrapper
        class="w-screen max-h-72 max-w-md"
        position="bottom"
        title="Select order category:"
        v-model:visible="categoryListVisibile" >
        <div
          v-for="category of orderCategories"
          :key="category"
          :class="[
            'px-1.5 py-2 md:py-3 cursor-pointer border-b border-placeholder border-dotted last:border-none md:text-lg hover:bg-black-lightest hover:bg-opacity-50',
            getCategoryClasses(category)
          ]"
          @click="selectCategory(category)" >
          {{ category }}
        </div>
      </zDialogNonLayoutWrapper>
    </div>
  </div>

</template>

<script>
import zShopProfileOrder from '@components/composite/zShopProfileOrder.vue'

import { ReactiveObserver } from '@/helpers/modules/reactiveObserver'

const reactiveObserver = new ReactiveObserver()

export default {
  name: 'ProfileOrderList',
  reactiveObserver,
  data () {
    return {
      categoryListVisibile: false,
      selectedOrderCategory: 'All',
      orderCategories: [
        'All',
        'Awaiting Payment',
        'In the work',
        'Is made',
        'Sent'
      ],
      orderList: [],
      loader: true,
    }
  },
  created () {
    this.createOrderListWatcher()
    this.requestOrders()
  },
  beforeUnmount () {
    this.$options.reactiveObserver.unobserve()
  },
  methods: {
    async requestOrders () {
      this.orderList = await this.$store.dispatch( 'order/outFetchOrderList' )
    },
    createOrderListWatcher () {
      const unwatch = this.$watch(
        'orderList',
        () => {
          this.initObserver()
          unwatch()
          this.loader = false
        },
        {
          flush: 'post'
        }
      )
    },
    initObserver () {
      const reactiveObserver = this.$options.reactiveObserver
      const $container = this.$refs.scrollableContainer

      reactiveObserver.init( $container, '0px 0px 0px 0px' )
      reactiveObserver.observe()
    },
    showCategoriesList () {
      this.categoryListVisibile = true
    },
    getCategoryClasses ( category ) {
      return {
        'text-primary': this.selectedOrderCategory === category
      }
    },
    selectCategory ( category ) {
      this.categoryListVisibile = false

      this.loader = true

      setTimeout( () => {
        this.selectedOrderCategory = category
        this.loader = false
      }, 1500 )
    },
    openOrderDetail ( orderId ) {
      this.$router.push( { name: 'ShopProfileOrderDetail', params: { orderId } } )
    }
  },
  directives: {
    observable: reactiveObserver.directive
  },
  components: {
    zShopProfileOrder
  }
}
</script>

<style lang="scss" scoped>

</style>
