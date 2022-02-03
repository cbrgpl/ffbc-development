<template >
  <div class="py-4 border-b border-placeholder border-solid border-opacity-40" >
    <div class="h-full flex items-start" >
      <zCheckboxSingle
        :checked="productSelected"
        @update:modelValue="$emit('productSelectChanged', $event)" ></zCheckboxSingle>
      <zMedia
        class="ml-3 mr-2 w-28 md:w-60 flex-shrink-0 self-stretch"
        :original-src="product.originalSrc" />
      <div >
        <h4 class="leading-5 mb-3" >
          {{ product.title }}
        </h4>
        <span class="md:flex md:flex-col" >

          <template
            v-for="feature of product.features"
            :key="feature.feature" >
            <small class="text-placeholder md:mb-2" >
              <u >
                {{ feature.feature }}
              </u>: {{ feature.value }};
            </small>

          </template>
        </span>
      </div>
    </div>
    <div >

    </div>
  </div>
</template>

<script>
export default {
  name: 'zShopProfileProduct',
  emits: [ 'productSelectChanged' ],
  props: {
    product: {
      type: Object,
      required: true,
    },
    showActions: {
      type: Boolean,
      default: false,
    },
    productSelected: {
      type: Boolean,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
