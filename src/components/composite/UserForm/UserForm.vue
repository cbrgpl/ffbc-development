<template >
  <zForm
    class="lg:grid grid-cols-1 lg:grid-cols-4 lg:gap-x-20"
    @validate="emitFormSubmit"
    :vuelidate-object="v$" >

    <section >
      <h4 class="mb-3.5 underline" >
        My name:
      </h4>

      <div class="flex flex-col" >
        <div class="form-field" >
          <zInput
            v-model.trim="userForm.firstName"
            label="First Name"
            :error-state="v$.userForm.firstName.$error"
            on-error="First name is required" />
          <small class="text-placeholder font-semibold" >
            Field is required
          </small>
        </div>

        <div class="form-field" >
          <zInput
            v-model.trim="userForm.lastName"
            label="Last Name"
            :error-state="v$.userForm.lastName.$error"
            on-error="Last name is required" />
          <small class="text-placeholder font-semibold" >
            Field is required
          </small>
        </div>
      </div>
    </section>

    <section >
      <h4 class="mb-3.5 underline" >
        My parameters:
      </h4>

      <div class="form-field" >
        <zInput
          v-model.number="userForm.height"
          label="Growth"
          mask="999"
          :error-state="v$.userForm.height.$error"
          on-error="required"
          class="mb-0.5" />

        <small class="text-placeholder font-semibold" >
          Field is required
        </small>
      </div>

      <zInput
        class="form-field"
        v-model.number="userForm.age"
        label="Age"
        mask="99"
        :error-state="v$.userForm.age.$error"
        on-error="required" />
    </section>

    <section class="flex flex-col" >
      <h4 class="mb-3.5 underline" >
        Address:
      </h4>

      <div class="flex flex-col lg:flex-wrap" >
        <div class="form-field" >
          <zInput
            v-model.trim="userForm.street"
            label="Street"
            :error-state="v$.userForm.street.$error"
            on-error="required"
            class="mb-0.5" />

          <small class="text-placeholder font-semibold" >
            Field is required
          </small>
        </div>

        <div class="form-field" >
          <zInput
            v-model.trim="userForm.city"
            label="City"
            :error-state="v$.userForm.city.$error"
            on-error="required"
            class="mb-0.5" />

          <small class="text-placeholder font-semibold" >
            Field is required
          </small>
        </div>

        <div class="form-field" >
          <zInput
            v-model.trim="userForm.country"
            label="Country"
            :error-state="v$.userForm.country.$error"
            on-error="required"
            class="mb-0.5" />

          <small class="text-placeholder font-semibold" >
            Field is required
          </small>
        </div>

        <zInput
          class="form-field"
          v-model.trim="userForm.state"
          label="State" />

        <div class="form-field" >
          <zInput
            v-model="userForm.zipCode"
            label="Zip code"
            :error-state="v$.userForm.zipCode.$error"
            on-error="required"
            class="mb-0.5" />

          <small class="text-placeholder font-semibold" >
            Field is required
          </small>
        </div>
      </div>
    </section>

    <section >
      <h4 class="mb-3.5 underline" >
        General Info:
      </h4>

      <zInput
        class="form-field"
        v-model="userForm.phoneNumber"
        label="Phone number"
        mask="+9 (999) 999 99-99"
        :error-state="v$.userForm.phoneNumber.$error"
        on-error="required" />

      <div class="form-field" >
        <zInput
          v-model.trim="userForm.instagramUrl"
          label="Instagram Url"
          :error-state="v$.userForm.instagramUrl.$error"
          on-error="required"
          class="mb-0.5" />

        <small class="text-placeholder font-semibold" >
          Field is required
        </small>
      </div>

      <zInput
        class="form-field"
        v-model="userForm.birthDate"
        mask="99.99.9999"
        label="Birth date mm.dd.yyyy"
        on-error="required" />

      <zSelect
        class="form-field"
        :list="bustTypes"
        :item-accesser="(bustType) => bustType[1].id"
        v-model="userForm.bustType" >
        <template #visible="{ value }" >
          <div class="pl-4 py-3 pr-2" >
            {{ typeof value === 'string' ? value : value[1].value }}
          </div>
        </template>

        <template #listItem="item" >
          <div class="pl-2 py-3" >
            {{ item[1].value }}
          </div>
        </template>
      </zSelect>
    </section>

    <template #actions >
      <div class="form-actions flex justify-end col-start-3 col-span-2" >

        <slot name="actions" >
          <zLoaderButton
            class="form-button"
            type="submit"
            :loader="false" >
            Update
          </zLoaderButton>
        </slot>
      </div>

    </template>
  </zForm>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import userFormValidation from './validations/userForm'

import { getBackendFormatDate } from '@filters'
import { STATUS_WORDS } from 'consts'

import bustTypes from '@/enums/backend/bustTypes.js'

export default {
  name: 'UserMe',
  emits: [ 'form-submitted' ],
  validations: userFormValidation(),
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      userForm: {
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        country: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        instagramUrl: '',
        birthDate: '',
        height: '',
        age: '',
        bustType: '',
      },
      contactServices: {},
    }
  },
  computed: {
    bustTypes () {
      return Object.entries( bustTypes )
    }
  },
  methods: {
    emitFormSubmit ( formValidationStatus ) {
      if ( formValidationStatus === STATUS_WORDS.ERROR ) {
        return
      }

      const formattedUserData = this.formatDataStruct( this.userForm )
      this.$emit( 'form-submitted', formattedUserData )
    },
    formatDataStruct ( data ) {
      const sendData = { ...data, ...data.address }

      delete sendData.address

      if ( sendData.birthDate ) {
        sendData.birthDate = getBackendFormatDate( sendData.birthDate )
      } else {
        delete sendData.birthDate
      }

      sendData.email = this.$store.getters[ 'user/email' ]

      this.removeEmptyProperties( sendData )

      return sendData
    },
    removeEmptyProperties ( data ) {
      for ( const prop in data ) {
        if ( data[ prop ] === '' ) {
          delete data[ prop ]
        }
      }
    },
    changeBustType ( event ) {
      const typeEntry = Object.entries( this.bustTypes ).find( ( type ) => type[ 1 ].value === event.target.value )
      this.userForm.bustType = typeEntry[ 1 ].id
    },
  },
}
</script>

<style lang="scss" scoped>
.form-field {
  @apply mb-7;
}

section {
  @apply mb-10 col-span-1 lg:col-span-2;
}
</style>
