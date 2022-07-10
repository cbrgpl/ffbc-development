<template >
  <div class="py-4 border-b last:border-none border-placeholder border-solid border-opacity-40" >
    <div class="h-full flex items-start" >
      <div v-if="$slots.actions" >
        <slot name="actions" />
      </div>

      <zMedia
        ref="media"
        class="ml-3 mr-2 w-28 md:w-60 flex-shrink-0 self-stretch"
        :show-original="originalShown"
        :original="product.media[0].display"
        :preview="product.media[0].preview"
        :auto-loading="false" />

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

<script >
export default {
  name: 'ZProfileProduct',
  expose: [ 'startMediaLoading' ],
  props: {
    product: {
      type: Object,
      required: true,
    },
    productFeatures: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      originalShown: false,
    }
  },
  methods: {
    startMediaLoading () {
      if ( !this.originalShown ) {
        this.$refs.media.startLoading()
        this.originalShown = true
      }
    }
  },
}
</script>

<style lang="scss" scoped >

</style>
