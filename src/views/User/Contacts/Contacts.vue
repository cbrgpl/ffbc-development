<template >
  <zForm
    @validate="setUserContacts"
    :vuelidate-object="v$" >

    <div :class="['mb-5', titleErrorClass]" >
      <h5 class="leading-4" >
        Specify contact service:
      </h5>
      <small class="text-placeholder font-semibold" >
        Select at least one service
      </small>
    </div>

    <ContactField
      @update:modelValue="mutateUserServices"
      class="mb-6"
      v-for="service of contactServices"
      :key="service"
      :service="service" />

    <zLoaderButton
      :loader="form.loading"
      class="form-button float-right" >
      Submit
    </zLoaderButton>
  </zForm>
</template>

<script>
import useVulidate from '@vuelidate/core'
import ContactField from './partial/ContactField.vue'

import { STATUS_WORDS } from 'consts'

/*

*/
export default {
  name: 'UserContact',
  setup () {
    return {
      v$: useVulidate(),
    }
  },
  data () {
    return {
      userServices: {},
      form: {
        loading: false,
      },
      contactServices: [
        'Facecall',
        'WhatsApp',
        'Zoom',
        'Skype'
      ],
    }
  },
  computed: {
    titleErrorClass () {
      return {
        'text-danger': this.v$.userServices.$error
      }
    }
  },
  methods: {
    mutateUserServices ( { service, id } ) {
      if ( id !== '' ) {
        this.userServices[ service ] = id
      } else {
        delete this.userServices[ service ]
      }
    },
    setUserContacts ( validationStatus ) {
      if ( validationStatus === STATUS_WORDS.ERROR ) {
        return
      }

      this.form.loading = true
    }
  },
  validations () {
    return {
      userServices: {
        atLeastOne: ( val ) => Object.keys( val ).length >= 1
      }
    }
  },
  components: {
    ContactField
  }
}
</script>

<style lang="scss" scoped>

</style>
