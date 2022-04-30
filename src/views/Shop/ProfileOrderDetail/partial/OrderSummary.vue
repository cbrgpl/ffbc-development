<template >
  <ul >
    <li class="mb-1.5" >
      <em >Ordered Date:&nbsp;</em> <span class="font-mono" >
        {{ formatDate(orderData.value.orderedDate) }}
      </span>
    </li>
    <li class="mb-1.5" >
      <em > Payment Date:&nbsp;</em> <span class="font-mono" >
        {{ orderData.paymentDate || '30.04.2022, 22:58:33' }}
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
  name: 'OrdererSummary',
  inject: [ 'orderData', 'orderProducts' ],
  computed: {
    paidAmount () {
      return this.orderProducts.value.reduce( ( sum, product ) => sum + parseFloat( product.price ), 0 )
    }
  },
  methods: {
    formatDate ( date ) {
      return date ? new Intl.DateTimeFormat( 'AE', { dateStyle: 'short', timeStyle: 'medium' } ).format( new Date( date ) ) : ''
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
