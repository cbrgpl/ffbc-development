<template >
  <h5 :class="['inline-flex text-lg sm:font-semibold', statusClasses]" >
    {{ status }}
  </h5>

</template>

<script>
import orderStatusClasses from '@/enums/info/orderStatusClasses'

export default {
  name: 'zShopOrderStatus',
  props: {
    status: {
      type: String,
      required: true,
      validator ( value ) {
        return Object.keys( orderStatusClasses ).includes( value )
      }
    }
  },
  computed: {
    statusClasses () {
      return orderStatusClasses[ this.status ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
