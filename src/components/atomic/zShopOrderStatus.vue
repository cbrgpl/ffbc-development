<template >
  <h5 :class="['inline-flex text-lg sm:font-semibold', statusClasses]" >
    {{ status.label }}
  </h5>

</template>

<script>
import orderStatusClasses from '@/enums/info/orderStatusClasses'

export default {
  name: 'zShopOrderStatus',
  props: {
    statusId: {
      type: Number,
      required: true,
    }
  },
  computed: {
    orderStatusTypes () {
      return this.$store.getters[ 'order/orderStatusTypes' ]
    },
    status () {
      const typeKeyword = Object.keys( this.orderStatusTypes ).find( ( typeKeyword ) => this.orderStatusTypes[ typeKeyword ].value === this.statusId )
      return this.orderStatusTypes[ typeKeyword ]
    },
    statusClasses () {
      return orderStatusClasses[ this.status.label ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
