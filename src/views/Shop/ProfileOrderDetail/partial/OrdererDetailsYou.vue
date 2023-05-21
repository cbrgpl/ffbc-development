<template >
  <div >
    <OrdererDetailsYouSubsection
      title="General Info:"
      :info="generalInfo" />

    <OrdererDetailsYouSubsection
      title="Delivery Info:"
      :info="deliveryInfo" />

    <OrdererDetailsYouSubsection
      title="Physical Info:"
      :info="physicalInfo" />
  </div>
</template>

<script >
import OrdererDetailsYouSubsection from './OrdererDetailsYouSubsection.vue'

export default {
  name: 'OrdererDetailsYou',
  components: {
    OrdererDetailsYouSubsection
  },
  inject: [ 'orderData' ],
  computed: {
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
          value: this.orderData.email
        },
        {
          label: 'Phone number',
          value: this.orderData.phoneNumber
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
          value: this.orderData.zipCode
        }
      ]
    },
    address () {
      const statePlacement = '$_there is state_$'
      const address = `${ this.orderData.country }, ${ statePlacement }${ this.orderData.city }, ${ this.orderData.street }`
      const state = this.orderData.state === null ? '' : `${ this.orderData.state }, `

      return address.replace( statePlacement, state )
    },
    physicalInfo () {
      return [
        {
          label: 'Height',
          value: this.orderData.height
        },
        {
          label: 'Weight',
          value: this.orderData.weight
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
  }
}
</script>

<style lang="scss" scoped >

</style>
