<template >
  <div >
    <OrdererDetailsYouSubsection
      title="General Info:"
      :info="generalInfo" >
      <template #sectionListEnd >
        <li >
          <strong >Instagram:&nbsp;</strong> <zLink
            external-link
            :url="order.instagramUrl" >
            {{ order.instagramUrl }}
          </zLink>
        </li>
      </template>
    </OrdererDetailsYouSubsection>

    <OrdererDetailsYouSubsection
      title="Delivery Info:"
      :info="deliveryInfo" />

    <OrdererDetailsYouSubsection
      title="Contact Services:"
      :info="contactServices" />

    <OrdererDetailsYouSubsection
      title="Physical Info:"
      :info="physicalInfo" />

  </div>
</template>

<script>
import OrdererDetailsYouSubsection from './OrdererDetailsYouSubsection.vue'

export default {
  name: 'OrdererDetailsYou',
  inject: [ 'orderData' ],
  computed: {
    order () {
      return this.orderData.value
    },
    contactServices () {
      const contactServices = [
        {
          name: 'whatsapp',
          value: 'whatsapp_name'
        },
        {
          name: 'zoom',
          value: 'zoomname'
        }
      ]

      return this.formatServices( contactServices )
    },
    generalInfo () {
      return [
        {
          label: 'email',
          value: this.order.email
        },
        {
          label: 'Phone number',
          value: this.order.phoneNumber
        },
      ]
    },
    deliveryInfo () {
      return [
        {
          label: 'Address',
          value: this.address
        },
        {
          label: 'Zipcode',
          value: this.order.zipCode
        }
      ]
    },
    address () {
      const statePlacement = '$_there is state_$'
      const address = `${ this.order.country }, ${ statePlacement }${ this.order.city }, ${ this.order.street }`
      const state = this.order.state === null ? '' : `${ this.order.state }, `

      return address.replace( statePlacement, state )
    },
    physicalInfo () {
      return [
        {
          label: 'Height',
          value: this.order.height
        },
        {
          label: 'Weight',
          value: this.order.weight
        }
      ]
    }
  },
  methods: {
    formatServices ( storeServices ) {
      return storeServices.reduce( ( accumulator, contactService ) => {
        const formattedContactService = {
          label: contactService.name,
          value: contactService.value
        }

        accumulator.push( formattedContactService )

        return accumulator
      }, [] )
    },
  },
  components: {
    OrdererDetailsYouSubsection
  }
}
</script>

<style lang="scss" scoped>

</style>
