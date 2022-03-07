<template >
  <div class="shop-main_padding relative" >
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

      <zDialogNonLayoutWrapper
        class="w-screen max-h-72 max-w-md"
        position="bottom"
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
      </zDialogNonLayoutWrapper>
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
            {
              display: 'https://picsum.photos/1920/1080?random=12'
            },
            {
              display: 'https://picsum.photos/1920/1080?random=22',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=52',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=2',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=21',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=54',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=25',
            },
          ],
          status: 'Awaiting Payment'
        },
        {
          title: 'Test order title',
          id: '010-4ef-9305',
          media: [
            {
              display: 'https://picsum.photos/1920/1080?random=12'
            },
            {
              display: 'https://picsum.photos/1920/1080?random=22',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=52',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=2',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=21',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=54',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=25',
            },
          ],
          status: 'In the work'
        },
        {
          title: 'Test order title',
          id: '010-4ef-9105',
          media: [
            {
              display: 'https://picsum.photos/1920/1080?random=12'
            },
            {
              display: 'https://picsum.photos/1920/1080?random=22',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=52',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=2',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=21',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=54',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=25',
            },
          ],
          status: 'Is made'
        },
        {
          title: 'Test order title',
          id: '010-5ef-9105',
          media: [
            {
              display: 'https://picsum.photos/1920/1080?random=12'
            },
            {
              display: 'https://picsum.photos/1920/1080?random=22',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=52',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=2',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=21',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=54',
            },
            {
              display: 'https://picsum.photos/1920/1080?random=25',
            },
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
