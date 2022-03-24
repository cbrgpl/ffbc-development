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
      class="mb-6"
      v-for="type of contactTypes"
      :key="type.id"
      :model-value="filledContacts[type.id]"
      @update:modelValue="mutateUserContact"
      :contact-type="type"
      :show-input-on-init="isFieldSelected(type.id)" />

    <zLoaderButton
      :loader="form.loading"
      class="form-button float-right" >
      Submit
    </zLoaderButton>
  </zForm>
</template>

<script>
import useVulidate from '@vuelidate/core'
import filledContacts from './validations/filledContacts'

import ContactField from './partial/ContactField.vue'

import { STATUS_WORDS } from 'consts'

export default {
  name: 'UserContact',
  setup () {
    return {
      v$: useVulidate(),
    }
  },
  data () {
    return {
      filledContacts: {},
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
  created () {
    this.fillForm()
  },
  computed: {
    titleErrorClass () {
      return {
        'text-danger': this.v$.filledContacts.$error
      }
    },
    contactTypes () {
      return this.$store.getters[ 'contacts/contactTypes' ]
    },
    userContacts () {
      return this.$store.getters[ 'contacts/userContacts' ]
    },
    selectedContacts () {
      return Object.keys( this.filledContacts ).map( ( id ) => parseInt( id ) )
    }
  },
  methods: {
    mutateUserContact ( { typeId, id } ) {
      if ( id !== '' ) {
        this.filledContacts[ typeId ] = id
      } else {
        delete this.filledContacts[ typeId ]
      }
    },
    async setUserContacts ( validationStatus ) {
      if ( validationStatus === STATUS_WORDS.ERROR ) {
        return
      }

      const preparedData = this.prepareDataToSend( this.filledContacts )

      this.form.loading = true
      await this.$store.dispatch( 'contacts/setContacts', preparedData )
      this.form.loading = false

      this.toast$.success( { summary: 'Your contacts have been successful updated!' } )
    },
    prepareDataToSend ( contacts ) {
      const preparedData = []

      for ( const contact of Object.entries( contacts ) ) {
        preparedData.push( {
          value: contact[ 1 ],
          contactService: parseInt( contact[ 0 ] )
        } )
      }

      return preparedData
    },
    fillForm () {
      for ( const contact of this.userContacts ) {
        this.filledContacts[ contact.contactService ] = contact.value
      }
    },
    isFieldSelected ( typeId ) {
      return this.selectedContacts.includes( typeId )
    }
  },
  validations: filledContacts(),
  components: {
    ContactField
  }
}
</script>

<style lang="scss" scoped>

</style>
