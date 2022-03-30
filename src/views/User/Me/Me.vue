<template >
  <div >
    <zForm
      class="lg:grid grid-cols-1 lg:grid-cols-4 lg:gap-x-20"
      @validate="updateUser"
      :state="form.state"
      :error-message="form.errorMessage"
      :success-message="form.successMessage"
      :vuelidate-object="v$" >

      <section >
        <h4 class="mb-3.5 underline" >
          My name:
        </h4>

        <div class="flex flex-col" >
          <div class="form-field" >
            <zInput
              v-model="userForm.firstName"
              label="First Name"
              :error-state="v$.userForm.firstName.$error"
              on-error="First name is required" />
            <small class="text-placeholder font-semibold" >
              Field is required
            </small>
          </div>

          <div class="form-field" >
            <zInput
              v-model="userForm.lastName"
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
            v-model="userForm.height"
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
          v-model="userForm.age"
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
              v-model="userForm.street"
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
              v-model="userForm.city"
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
              v-model="userForm.country"
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
            v-model="userForm.state"
            label="State" />

          <!-- <div class="form-field" >
            <zInput
              v-model="userForm.zipcode"
              label="Zipcode"
              :error-state="v$.userForm.zipcode.$error"
              on-error="required"
              class="mb-0.5" />

            <small class="text-placeholder font-semibold" >
              Field is required
            </small>
          </div> -->
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
            v-model="userForm.instagramUrl"
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

        <!-- TODO Написать Селект-компонент -->
        <select
          class="form-field"
          @input="changeBustType"
          name="bustType" >
          <option
            v-for="(type, typeId) in bustType"
            :key="typeId" >
            {{ type.value }}
          </option>
        </select>
      </section>

      <template #actions >

        <div class="form-actions flex justify-end col-start-3 col-span-2" >
          <zLoaderButton
            class="form-button"
            type="submit"
            :loader="form.loading" >
            Log in
          </zLoaderButton>
        </div>

      </template>

    </zForm>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import userFormValidation from './validations/userForm'

import { getObjectPartClone } from '@functions'
import { getBackendFormatDate } from '@filters'
import { STATUS_WORDS } from 'consts'

import bustType from '@/enums/backend/bustTypes.js'

// TODO Вернуть zipcode, когда он появится в АПИ

export default {
  name: 'UserMe',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      form: {
        state: null,
        errorMessage: '',
        successMessage: '',
        loading: false,
      },
      userForm: {
        firstName: 'dima',
        lastName: 'dmi',
        street: 'novo',
        city: 'dodo',
        country: 'qweew',
        state: '',
        // zipcode: '015305',
        phoneNumber: '',
        instagramUrl: 'https://instagram.com/cbrgpl',
        birthDate: '',
        height: '192',
        age: '21',
        bustImplants: 2,
      },
      contactServices: {},
      bustType
    }
  },
  created () {
    this.fillForm()
  },
  methods: {
    async updateUser ( formValidationStatus ) {
      if ( formValidationStatus === STATUS_WORDS.ERROR ) {
        return
      }

      this.form.loading = true
      const preparedData = this.prepareDataToSend( this.userForm )
      const dispatch = await this.$store.dispatch( 'user/updateUser', preparedData )
      this.form.loading = false

      if ( dispatch.success ) {
        this.toast$.success( { summary: 'Data successful updated' } )
      } else {
        // TODO мб сделать, чтобы появлялись ошибки с бека
      }
    },
    prepareDataToSend ( data ) {
      const sendData = { ...data, ...data.address }

      delete sendData.address

      if ( sendData.birthDate ) {
        sendData.birthDate = getBackendFormatDate( sendData.birthDate )
      } else {
        delete sendData.birthDate
      }

      sendData.email = this.$store.getters[ 'user/email' ]

      return sendData
    },
    changeBustType ( event ) {
      const typeEntry = Object.entries( this.bustType ).find( ( type ) => type[ 1 ].value === event.target.value )
      this.userForm.bustImplants = typeEntry[ 1 ].id
    },
    fillForm () {
      const userData = this.$store.getters[ 'user/userData' ]
      const keys = Object.keys( this.userForm )

      this.userForm = getObjectPartClone( userData, keys )
    }
  },
  validations: userFormValidation()
}
</script>

<style>
.form-field {
  @apply mb-7;
}

section {
  @apply mb-10 col-span-1 lg:col-span-2;
}
</style>
