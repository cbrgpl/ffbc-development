<template >
  <div  >
    <h4 >Test page</h4>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Preview',
  data () {
    return {
      loading: true,
    }
  },
  created () {
    this.loadCartProducts()
  },
  methods: {
    async loadCartProducts () {
      const bindedCartItems = await this.$store.dispatch( 'cart/outBindedCartItems' )
      console.log( bindedCartItems )
      this.loading = false
    }
  },
  components: {
  }

}
</script>

<style lang="scss" scoped>
</style>
