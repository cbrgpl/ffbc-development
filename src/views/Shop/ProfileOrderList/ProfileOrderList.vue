<template >
  <div class="relative" >
    <div
      v-if="loader"
      class="absolute left-0 top-0 w-full h-full z-140" >
      <zLoader
        size="200px"
        background
        title />

    </div>

    <div class="h-fit w-full flex flex-col shop-main_padding" >
      <zPseudoSelect
        class="md:w-72"
        @click="showCategoriesList"
        title="Show" >
        {{ selectedOrderCategory }}
      </zPseudoSelect>

      <h4 class="text-danger-darken underline" >
        <strong >That is test static order's data!</strong>
      </h4>

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
          status: 1
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
          status: 2
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
          status: 3
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
          status: 4
        },
      ],
      loader: false,
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
      this.categoryListVisibile = false

      this.loader = true

      setTimeout( () => {
        this.selectedOrderCategory = category
        this.loader = false
      }, 1500 )
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
