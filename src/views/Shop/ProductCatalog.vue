<template >
  <div class="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 2xl:grid-cols-4 xl:gap-x- items-stretch px-3" >
    <zShopProductCard
      v-for="product of fakeProducts"
      :key="product.title"
      :product="product" />
  </div>
</template>

<script>
import zShopProductCard from '@components/composite/zShopProductCard.vue'
import fakeProducts from '@enums/fake/products'

export default {
  name: 'ProductCatalog',
  data () {
    return {
      fakeProducts
    }
  },
  components: {
    zShopProductCard,
  }
}
</script>

<style>

</style>
