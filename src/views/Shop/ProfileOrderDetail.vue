<template >
  <div class="shop-main-padding flex-col flex" >
    <h2 class="leading-tight" >
      {{ order.title }}
    </h2>
    <zShopOrderStatus
      :status="order.status" />

    <zDivider class="my-3" />

    <div class="flex flex-col md:flex-row" >
      <div class="mr-32" >
        <h3 > Orderer information: </h3>
        <div class="font-mono" >
          <h5 > {{ fullName }} </h5>
          <h5 > {{ order.email }} </h5>
          <h5 > {{ prettyPhone }} </h5>
        </div>

      </div>

      <zDivider class="my-3" />

      <div >
        <h3 >Payment:</h3>
        <div class="font-mono" >
          <h5 class="underline" >
            ${{ paymentValue }}
          </h5>
          <h5 > from {{ order.paymentDate }} </h5>
        </div>
      </div>
    </div>

    <zDivider class="my-3" />

    <h3 > Order products: </h3>
    <div class="flex flex-col" >
      <zShopProfileProduct
        :show-actions="false"
        :product="product"
        v-for="product of products"
        :key="product.id" />

    </div>
  </div>
</template>

<script>
import zShopOrderStatus from '@components/atomic/zShopOrderStatus.vue'
import zShopProfileProduct from '@components/composite/zShopProfileProduct.vue'

import products from '@enums/fake/cartProduct'

import { getPrettyPhone } from '@filters'

export default {
  name: 'ProfileOrderDetail',
  props: {
    orderId: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      order: {
        title: 'Test order title',
        id: '010-4ef-9304',
        phone: '+79230040520',
        paymentDate: '04.05.2022 14:59',
        email: 'cybirgpl@gmail.com',
        firstName: 'Dmitry',
        lastName: 'Ponomaryov',
        media: [
          'https://picsum.photos/1920/1080?random=12',
          'https://picsum.photos/1920/1080?random=22',
          'https://picsum.photos/1920/1080?random=52',
          'https://picsum.photos/1920/1080?random=2',
          'https://picsum.photos/1920/1080?random=21',
          'https://picsum.photos/1920/1080?random=54',
          'https://picsum.photos/1920/1080?random=25',
          'https://picsum.photos/1920/1080?random=29',
        ],
        status: 'Awaiting Payment'
      },
      paymentValue: 239.19,
      products
    }
  },
  computed: {
    prettyPhone () {
      return getPrettyPhone( this.order.phone )
    },
    fullName () {
      return this.order.firstName + ' ' + this.order.lastName
    }
  },
  components: {
    zShopOrderStatus,
    zShopProfileProduct
  }

}
</script>

<style lang="scss" scoped>
.information-field {
  @apply font-mono;
}
</style>
