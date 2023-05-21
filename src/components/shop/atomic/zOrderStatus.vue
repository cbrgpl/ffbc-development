<template >
  <h5 :class="['inline-flex items-center space-x-4',]" >
    <zButton
      v-if="statusValue === 1 && showCheckoutBtn"
      v-tooltip.left="'Checkout order'"
      variant="safety"
      class="p-1"
      @click="openCheckoutDialog" >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32" >
        <path
          fill="currentColor"
          d="M18 28v-2a10 10 0 0 0 10-10h2a12 12 0 0 1-12 12Z" /><path
            fill="currentColor"
            d="M18 23v-2a5 5 0 0 0 5-5h2a7 7 0 0 1-7 7Z" /><path
              fill="currentColor"
              d="M27 11h-6V7a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3v4H3a1 1 0 0 0-1 1.15L3.88 24.3a2 2 0 0 0 2 1.7H15v-2H5.86L4.17 13H27ZM11 7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4h-8Z" />
      </svg>
    </zButton>
    <span :class="['text-lg sm:font-semibold', statusClasses]" >
      {{ status.label }}
    </span>
  </h5>
</template>

<script >
import orderStatusClasses from '@/enums/info/orderStatusClasses'
import zButton from '@/components/general/atomic/zButton.vue'

export default {
  name: 'ZShopOrderStatus',
  components: {
    zButton
  },
  props: {
    statusValue: {
      type: Number,
      required: true,
    },
    bindedCartItems: {
      type: Array,
      required: true,
    },
    orderId: {
      type: Number,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
    showCheckoutBtn: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    statuses () {
      return this.$store.getters[ 'order/orderStatusTypes' ]
    },
    status () {
      return this.statuses.find( ( status ) => status.value === this.statusValue )
    },
    statusClasses () {
      return orderStatusClasses[ this.status.label ]
    },
  },
  methods: {
    openCheckoutDialog() {
      this.dialog$.show( 'checkoutOrder', { bindedCartItems: this.bindedCartItems, orderId: this.orderId, userId: this.userId } )
    }
  }
}
</script>

<style lang="scss" scoped >

</style>
