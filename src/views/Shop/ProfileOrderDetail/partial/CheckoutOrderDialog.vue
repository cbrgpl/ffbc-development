<template >
  <zDialog class="verification-dialog w-11/12 sm:w-8/12 md:w-2/4 max-w-md" >
    <template #header >
      <h4 >Confirmation link</h4>
    </template>

    <div class="my-16" ></div>

    <PaypalPayment
      :binded-cart-items="bindedCartItems"
      :order-id="orderId"
      :user-id="userId"
      @sectionComplete="closeDialog" />
  </zDialog>
</template>

<script >
import zDialog from '@general_components/composite/zDialog/zDialog.vue'
import PaypalPayment from '../../Checkout/partial/PaypalPayment.vue'

export default {
  name: 'CheckoutOrderDialog',
  components: {
    zDialog,
    PaypalPayment
  },
  props: {
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
    }
  },
  methods: {
    closeDialog() {
      this.dialog$.hide( 'checkoutOrder' )
    }
  },
}
</script>

<style lang="" >
</style>
