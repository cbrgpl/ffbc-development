<template >
  <div class="relative flex items-center justify-center" >
    <zLoader
      v-if="loading"
      size="256px" />
    <div ref="buttonContainer" >
    </div>
  </div>
</template>

<script >
import zLoader from '@/components/general/atomic/zLoader.vue'

const PAYPAL_CLIENT_ID = 'Af9CU4RWk4jdSTjXqjs9uMQFkQrdiNJ6lQQIPcEhZ9-ln3hYyiKpWSeqU9QSbMfJlwsGFwLp41V4v7oz'

export default {
  name: 'PaypalPayment',
  components: {
    zLoader
  },
  props: {
    bindedCartItems: {
      type: Array,
      required: true,
    },
    orderId: {
      type: Number,
      required: true
    },
    userId: {
      type: Number,
      required: true
    }
  },
  emits: [ 'section-complete' ],
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    purchaseUnits () {
      return this.bindedCartItems.map( item => ( {
        // eslint-disable-next-line camelcase
        custom_id: this.orderId,
        // eslint-disable-next-line camelcase
        reference_id: item.product.id,
        description: item.product.title.slice( 25 ),
        amount: {
        // eslint-disable-next-line camelcase
          currency_code: 'USD',
          value: item.cartItem.price
        }
      } ) )
    }
  },
  async mounted() {
    await this.insertScript()
    this.loading = false

    window.paypal.Buttons( {
      createOrder: ( data, actions ) => {
        return actions.order.create( {
          // eslint-disable-next-line camelcase
          purchase_units: this.purchaseUnits
        } )
      },
      onApprove: async ( data, actions ) => {
        const order = await actions.order.capture()
        if ( order.status === 'COMPLETED' ) {
          const toastDetail = this.getToastDetails( this.userId )
          this.toast$.success( { summary: `Order #${ this.orderId } created`, detail: toastDetail, life: 15000 } )

          this.$emit( 'section-complete', {
            sectionName: this.$options.name,
          } )
        } else {
          this.toast$.error( { summary: 'An error occurred while transiting', detail: '', life: 15000 } )
        }
      }
    } ).render( this.$refs.buttonContainer )

  },
  methods: {
    insertScript() {
      const $script = document.createElement( 'script' )
      $script.src = `https://www.paypal.com/sdk/js?client-id=${ PAYPAL_CLIENT_ID }&currency=USD&components=buttons`

      let resolvePromise = null
      $script.onload = () => resolvePromise()

      document.body.append( $script )

      return new Promise( ( resolve ) => resolvePromise = resolve )
    },
    getToastDetails () {
      const generalPart = 'Administrator soon will contact with you.<br>'
      const partByUserType = this.userId !== null ? 'You can explore details in your profile.' : 'Unfortunately, you can\'t explore order detail.'

      return generalPart + partByUserType
    }
  }
}
</script>

<style lang="" >

</style>
