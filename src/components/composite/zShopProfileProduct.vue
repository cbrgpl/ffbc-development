<template >
  <div class="py-4 border-b last:border-none border-placeholder border-solid border-opacity-40" >
    <div class="h-full flex items-start" >
      <zCheckboxSingle
        v-if="showActions"
        :checked="productSelected"
        @update:modelValue="$emit('productSelectChanged', $event)" ></zCheckboxSingle>
      <zMedia
        class="ml-3 mr-2 w-28 md:w-60 flex-shrink-0 self-stretch"
        :show-original="showOriginal"
        :original="product.media[0].display"
        :preview="product.media[0].preview" />
      <div >
        <h4 class="leading-5 mb-3" >
          {{ product.title }}
        </h4>
        <span class="md:flex md:flex-col" >

          <template
            v-for="feature of productFeatures"
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
    productFeatures: {
      type: Array,
      required: true,
    },
    showActions: {
      type: Boolean,
      default: true,
    },
    productSelected: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      showOriginal: false
    }
  },
  mounted () {
    // TODO Не понятно зачем нужно
    setTimeout( () => {
      this.showOriginal = true
    }, 0 )
  },
}
</script>

<style lang="scss" scoped>

</style>
