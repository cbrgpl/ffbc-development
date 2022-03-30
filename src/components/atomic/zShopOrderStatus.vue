<template >
  <h5 :class="['inline-flex text-lg sm:font-semibold', statusClasses]" >
    {{ status.value }}
  </h5>

</template>

<script>
import orderStatusClasses from '@/enums/info/orderStatusClasses'
import orderStatuseTypes from '@/enums/backend/orderStatusTypes'

export default {
  name: 'zShopOrderStatus',
  props: {
    statusId: {
      type: Number,
      required: true,
      validator ( value ) {
        return Object.entries( orderStatuseTypes ).map( ( type ) => type[ 1 ].id ).includes( value )
      }
    }
  },
  computed: {
    status () {
      const typeKeyword = Object.keys( orderStatuseTypes ).find( ( typeKeyword ) => orderStatuseTypes[ typeKeyword ].id === this.statusId )
      return orderStatuseTypes[ typeKeyword ]
    },
    statusClasses () {
      return orderStatusClasses[ this.status.value ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
