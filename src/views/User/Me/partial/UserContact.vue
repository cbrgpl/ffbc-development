<template >
  <div >

    <div class="mb-5" >
      <slot />
    </div>

    <UserContactField
      @update:modelValue="mutateUserServices"
      class="mb-6"
      v-for="service of contactServices"
      :key="service"
      :service="service" />
  </div>
</template>

<script>
import UserContactField from './UserContactField.vue'

export default {
  name: 'UserContact',
  props: {
    modelValue: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      contactServices: [
        'Facecall',
        'WhatsApp',
        'Zoom',
        'Skype'
      ],
      userServices: {}
    }
  },
  created () {
    this.bindUserServicesToExternalVar()
  },
  methods: {
    mutateUserServices ( { service, id } ) {
      if ( id !== '' ) {
        this.userServices[ service ] = id
      } else {
        delete this.userServices[ service ]
      }
    },
    bindUserServicesToExternalVar () {
      this.$emit( 'update:modelValue', this.userServices )
    }
  },
  components: {
    UserContactField
  }
}
</script>

<style lang="scss" scoped>

</style>
