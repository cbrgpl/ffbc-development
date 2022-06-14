<template >
  <div class="bg-black-lighten border border-solid border-white rounded-md px-3 py-4" >

    <div >
      <h3 > {{ order.title }} </h3>
      <h5 class="font-mono tracking-widest leading-none" >
        {{ order.id }}
      </h5>
    </div>

    <zDivider class="my-3.5" />

    <div class="flex w-full relative h-80 xl:h-72 overflow-x-auto select-none" >
      <zMediaWithTitle
        @VnodeMounted="createIntersectedWatcher"
        :ref="pushMediaToBuffer"
        v-for="media of media"
        :key="media.display"
        title="A Media of product"
        class="mr-2 flex-shrink-0 h-full w-full max-w-full w-auto last:mr-0"
        :original="media.display"
        :preview="media.preview"
        :intersected="intersected"
        :auto-loading="false"  />

      <div
        v-if="loader"
        class="absolute w-full h-full" >
        <zLoader size="100px" />
      </div>
    </div>

    <zDivider class="my-3.5" />

    <div class="flex flex-col items-stretch sm:flex-row sm:items-center justify-between" >

      <zShopOrderStatus
        class="mb-1.5"
        :status-value="order.orderStatus" />

      <zButton
        class="px-8 py-3"
        @click="emitOpenOrderDetail" >
        Detail
      </zButton>
    </div>
  </div>
</template>

<script>
import zShopOrderStatus from '@components/atomic/zShopOrderStatus.vue'

export default {
  name: 'zShopProfileOrder',
  emits: [ 'open-order-detail' ],
  props: {
    order: {
      type: Object,
      required: true,
    },
    intersected: {
      type: Boolean,
      defaut: null
    },
  },
  data () {
    return {
      media: [],
      loader: true,
    }
  },
  computed: {
    productIds () {
      return this.order.orderItems.reduce( ( accumulator, orderItem ) => {
        if ( orderItem.product !== null ) {
          accumulator.push( orderItem.product )
        }

        return accumulator
      }, [] )
    }
  },
  created () {
    this.setNonReactiveMediaBuffer()
    this.setOrderMedia()
  },
  methods: {
    async setOrderMedia () {
      await this.$store.dispatch( 'cart/addProductsByIds', this.productIds )

      const productBuffer = this.$store.getters[ 'cart/productBuffer' ]
      this.media = productBuffer.filter( ( product ) => this.productIds.includes( product.id ) )
        .reduce( ( accumulator, product ) => {
          if ( product.media.length ) {
            accumulator.push( product.media[ 0 ] )
          }

          return accumulator
        }, [] )

      this.loader = false
    },
    createIntersectedWatcher () {
      if ( !this.intersectedWatcher ) {
        this.intersectedWatcher = this.$watch(
          'intersected',
          ( intersected ) => {
            if ( intersected ) {
              for ( const mediaVNode of this.mediaBuffer ) {
                mediaVNode.startLoading()
              }
            }
          },
          {
            immediate: true,
            flush: 'post'
          }
        )
      }
    },
    setNonReactiveMediaBuffer () {
      this.mediaBuffer = []
    },
    emitOpenOrderDetail () {
      this.$emit( 'open-order-detail', this.order.id )
    },
    pushMediaToBuffer ( vNode ) {
      if ( !this.mediaBuffer.includes( vNode ) ) {
        this.mediaBuffer.push( vNode )
      }
    }
  },
  components: {
    zShopOrderStatus
  }
}
</script>

<style lang="scss" scoped>

</style>
