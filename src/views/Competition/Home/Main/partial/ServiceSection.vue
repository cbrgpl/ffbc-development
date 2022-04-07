<template >
  <div class="bg-black-lighten rounded-md w-full py-4" >
    <div class="text-2xl font-semibold border-b border-placeholder border-solid pb-4 px-4" >
      {{ title }}
    </div>

    <div class="px-4" >
      <ServiceSectionItem :data="header" />
      <ServiceSectionItem
        v-for="(beauty, i) of beauties"
        :key="i"
        :data="beauty" />
    </div>
  </div>

</template>

<script>
import serviceTypes from '@enums/info/serviceTypes.js'
import ServiceSectionItem from './ServiceSectionItem.vue'

export default {
  name: 'ServiceSection',
  props: {
    competitionId: {
      type: [ String, Number ],
      required: true,
    },
    title: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      serviceTypes,
      header: {
        type: {
          icon: 'catchingPokemon',
          fullTitle: 'Beauty service name',
          title: 'Beauty Icon'
        },
        price: 'Price'
      },
      beauties: [
        {
          type: serviceTypes.stimulation,
          price: 20493,
        },
        {
          type: serviceTypes.tan,
          price: 32199,
        },
        {
          type: serviceTypes.tan,
          price: 25400,
        },
        {
          type: serviceTypes.beauty,
          price: 10999,
        },
        {
          type: serviceTypes.beauty,
          price: 17999,
        },
        {
          type: serviceTypes.stimulation,
          price: 14500,
        }
      ]
    }
  },
  components: {
    ServiceSectionItem
  }
}
</script>

<style>

</style>
