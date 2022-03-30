<template >
  <ul >
    <li class="mb-1.5" >
      <em >Ordered Date:&nbsp;</em> <span class="font-mono" >
        {{ orderData.orderedDate || '05-14-2021 18:40:28' }}
      </span>
    </li>
    <li class="mb-1.5" >
      <em > Payment Date:&nbsp;</em> <span class="font-mono" >
        {{ orderData.paymentDate || '05-14-2021 19:39:49' }}
      </span>
    </li>
    <li >
      <em > Paid:&nbsp;</em> <span class="font-mono" >
        ${{ paidAmount || '29.84' }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'OrdererInfo',
  inject: [ 'orderData', 'orderProducts' ],
  computed: {

    paidAmount () {
      return this.orderProducts.value.reduce( ( sum, product ) => sum + parseFloat( product.price ), 0 )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
