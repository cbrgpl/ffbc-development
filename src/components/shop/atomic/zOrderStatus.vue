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
    statusValue: {
      type: Number,
      required: true,
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
