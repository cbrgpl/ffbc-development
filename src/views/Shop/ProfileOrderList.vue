<template >
  <div class="shop-main-padding relative" >
    <div class="flex flex-col" >
      <zPseudoSelect
        class="md:w-72"
        @click="showCategoriesList"
        title="Show" >
        {{ selectedOrderCategory }}
      </zPseudoSelect>

      <div class="mt-3 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-y-5 md:gap-4 2xl:gap-y-8" >

        <zShopProfileOrder
          @open-order-detail='openOrderDetail'
          v-for="order of ordersList"
          :key="order.id"
          :order="order" />
      </div>

      <zDialogList
        title="Select order category:"
        v-model:visible="categoryListVisibile" >
        <div
          v-for="category of orderCategories"
          :key="category"
          :class="[
            'px-1.5 py-2 md:py-3 cursor-pointer border-b border-placeholder border-dotted last:border-none md:text-lg hover:bg-black-lightest hover:bg-opacity-50',
            getCategoryClasses(category)
          ]"
          @click="selectCategory(category)" >
          {{ category }}
        </div>
      </zDialogList>
    </div>
  </div>
</template>

<script>
import zShopProfileOrder from '@components/composite/zShopProfileOrder.vue'

export default {
  name: 'ProfileOrderList',
  data () {
    return {
      categoryListVisibile: false,
      selectedOrderCategory: 'All',
      orderCategories: [
        'All',
        'Awaiting Payment',
        'In the work',
        'Is made',
        'Sent'
      ],
      ordersList: [
        {
          title: 'Test order title',
          id: '010-4ef-9304',
          media: [
            'https://picsum.photos/1920/1080?random=12',
            'https://picsum.photos/1920/1080?random=22',
            'https://picsum.photos/1920/1080?random=52',
            'https://picsum.photos/1920/1080?random=2',
            'https://picsum.photos/1920/1080?random=21',
            'https://picsum.photos/1920/1080?random=54',
            'https://picsum.photos/1920/1080?random=25',
            'https://picsum.photos/1920/1080?random=29',
          ],
          status: 'Awaiting Payment'
        },
        {
          title: 'Test order title',
          id: '010-4ef-9305',
          media: [
            'https://picsum.photos/1920/1080?random=16',
            'https://picsum.photos/1920/1080?random=27',
            'https://picsum.photos/1920/1080?random=56',
            'https://picsum.photos/1920/1080?random=9',
            'https://picsum.photos/1920/1080?random=12',
            'https://picsum.photos/1920/1080?random=64',
            'https://picsum.photos/1920/1080?random=95',
            'https://picsum.photos/1920/1080?random=102',
          ],
          status: 'In the work'
        },
        {
          title: 'Test order title',
          id: '010-4ef-9105',
          media: [
            'https://picsum.photos/1920/1080?random=13',
            'https://picsum.photos/1920/1080?random=32',
            'https://picsum.photos/1920/1080?random=40',
            'https://picsum.photos/1920/1080?random=23',
            'https://picsum.photos/1920/1080?random=74',
            'https://picsum.photos/1920/1080?random=69',
            'https://picsum.photos/1920/1080?random=98',
            'https://picsum.photos/1920/1080?random=105',
          ],
          status: 'Is made'
        },
        {
          title: 'Test order title',
          id: '010-5ef-9105',
          media: [
            'https://picsum.photos/1920/1080?random=3',
            'https://picsum.photos/1920/1080?random=39',
            'https://picsum.photos/1920/1080?random=44',
            'https://picsum.photos/1920/1080?random=34',
            'https://picsum.photos/1920/1080?random=4',
            'https://picsum.photos/1920/1080?random=58',
            'https://picsum.photos/1920/1080?random=53',
            'https://picsum.photos/1920/1080?random=84',
          ],
          status: 'Sent'
        },
      ]
    }
  },
  methods: {
    showCategoriesList () {
      this.categoryListVisibile = true
    },
    getCategoryClasses ( category ) {
      return {
        'text-primary': this.selectedOrderCategory === category
      }
    },
    selectCategory ( category ) {
      this.selectedOrderCategory = category
      this.categoryListVisibile = false
    },
    openOrderDetail ( orderId ) {
      this.$router.push( { name: 'ShopProfileOrderDetail', params: { orderId } } )
    }
  },
  components: {
    zShopProfileOrder
  }
}
</script>

<style lang="scss" scoped>

</style>
