<template >
  <div class="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-2 xl:grid-cols-3 xl:gap-x-5 items-stretch px-3" >
    <zShopProductCard
      v-for="product of fakeProdcuts"
      :key="product.title"
      :product-data="product" />
  </div>
</template>

<script>
import zShopProductCard from '@components/composite/zShopProductCard.vue'
import fakeProdcuts from '@enums/fake/products'
export default {
  name: 'ProductCatalog',
  data () {
    return {
      fakeProdcuts
    }
  },
  components: {
    zShopProductCard,
  }
}
</script>

<style>

</style>
