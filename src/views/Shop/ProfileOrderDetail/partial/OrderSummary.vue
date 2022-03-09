<template >
  <ul >
    <li class="mb-1.5" >
      <em >Ordered Date:&nbsp;</em> <span class="font-mono" >
        {{ orderData.orderedDate }}
      </span>
    </li>
    <li class="mb-1.5" >
      <em > Payment Date:&nbsp;</em> <span class="font-mono" >
        {{ orderData.paymentDate }}
      </span>
    </li>
    <li >
      <em > Paid:&nbsp;</em> <span class="font-mono" >
        ${{ paidAmount }}
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
