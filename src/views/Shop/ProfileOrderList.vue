<template >
  <div class="relative px-2.5 pt-4" >
    <div class="flex flex-col" >
      <zPseudoSelect
        class="md:w-72"
        @click="showCategoriesList"
        title="Show" >
        {{ selectedOrderCategory }}
      </zPseudoSelect>

      <div class="mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5 md:gap-4 xl:gap-y-8" >
        <div
          v-for="i of 20"
          :key="i"
          class="bg-primary-darkest border border-solid border-placeholder h-36" ></div>
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
