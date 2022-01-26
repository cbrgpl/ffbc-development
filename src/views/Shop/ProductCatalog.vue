<template >
  <div class="flex flex-col items-stretch px-3" >
    <zShopProductCard
      v-for="product of testProducts"
      :key="product.title"
      class="w-full md:w-96 mx-auto mb-5"
      :product-data="product" ></zShopProductCard>
  </div>
</template>

<script>
import zShopProductCard from '@components/composite/zShopProductCard.vue'

export default {
  name: 'ProductCatalog',
  data () {
    return {
      testProducts: [
        {
          title: 'Lorem, ipsum dolor sit  qwqwe qe qwewq eqweqe qweqeqw eqe amet consectetur adipisicing elit. Commodi, quaerat sed consectetur fugit tempore labore?',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, nihil qui quidem sapiente, aperiam aliquam quo nisi dolores fugit sunt libero laborum labore veritatis molestias facere ea perferendis. Ut laborum velit commodi nam aut odio, amet reprehenderit id? Voluptates recusandae earum mollitia neque iusto similique sunt, dicta ea magnam sint dignissimos aliquid accusantium ut officia facere eum aliquam doloremque optio beatae natus, consequatur possimus cumque magni porro? Mollitia explicabo deleniti iure eaque ipsum, nihil ut dicta maiores tenetur delectus facilis laborum sequi nemo beatae autem repellat maxime? Maiores non adipisci corporis doloribus cupiditate sunt fuga placeat iure esse, porro explicabo alias sit neque laudantium nihil ut amet itaque reprehenderit. Perspiciatis numquam quibusdam quaerat placeat quam aut accusamus modi optio aspernatur tempora doloribus iste dolorem quae iusto ex, assumenda voluptas repudiandae ipsum aliquam inventore accusantium! Iusto eaque eius ipsam deserunt corporis, optio laboriosam amet! Earum voluptatum enim excepturi quisquam. Voluptatum, atque?',
          type: 'type1',
          price: '5.99',
          count: 0,
          media: [
            'https://picsum.photos/1920/1080?random=1',
            'https://picsum.photos/1920/1080?random=2',
            'https://picsum.photos/1920/1080?random=3',
            'https://picsum.photos/1920/1080?random=4',
            'https://picsum.photos/1920/1080?random=5',
          ],
        },
        {
          title: 'Lorem, ipsum dolor sit amet consectetur adipisicing?',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, nihil qui quidem sapiente, aperiam aliquam quo nisi dolores fugit sunt libero laborum labore veritatis molestias facere ea perferendis. Ut laborum velit commodi nam aut odio, amet reprehenderit id? Voluptates recusandae earum mollitia neque iusto similique sunt, dicta ea magnam sint dignissimos aliquid accusantium ut officia facere eum aliquam doloremque optio beatae natus, consequatur possimus cumque magni porro? Mollitia explicabo deleniti iure eaque ipsum, nihil ut dicta maiores tenetur delectus facilis laborum sequi nemo beatae autem repellat maxime? Maiores non adipisci corporis doloribus cupiditate sunt fuga placeat iure esse, porro explicabo alias sit neque laudantium nihil ut amet itaque reprehenderit. Perspiciatis numquam quibusdam quaerat placeat quam aut accusamus modi optio aspernatur tempora doloribus iste dolorem quae iusto ex, assumenda voluptas repudiandae ipsum aliquam inventore accusantium! Iusto eaque eius ipsam deserunt corporis, optio laboriosam amet! Earum voluptatum enim excepturi quisquam. Voluptatum, atque?',
          type: 'type3',
          price: '6.09',
          count: 10,
          media: [
            'https://picsum.photos/1920/1080?random=1',
            'https://picsum.photos/1920/1080?random=2',
            'https://picsum.photos/1920/1080?random=3',
            'https://picsum.photos/1920/1080?random=4',
            'https://picsum.photos/1920/1080?random=5',
          ],
        }
      ]
    }
  },
  components: {
    zShopProductCard,
  }
}
</script>

<style>

</style>
