<template >
  <div >
    <zForm
      @validate="updateUser"
      :state="form.state"
      :error-message="form.errorMessage"
      :success-message="form.successMessage"
      :vuelidate-object="v$" >

      <section >
        <h4 class="mb-3.5 underline" >
          My name:
        </h4>

        <div class="flex flex-col md:flex-row" >
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

      <section class=" flex flex-col md:flex-row" >
        <h4 class="mb-3.5 underline" >
          Address:
        </h4>

        <div class="form-field" >
          <zInput
            v-model="userForm.address.street"
            label="Street"
            :error-state="v$.userForm.address.street.$error"
            on-error="required"
            class="mb-0.5" />

          <small class="text-placeholder font-semibold" >
            Field is required
          </small>
        </div>

        <div class="form-field" >
          <zInput
            v-model="userForm.address.city"
            label="City"
            :error-state="v$.userForm.address.city.$error"
            on-error="required"
            class="mb-0.5" />

          <small class="text-placeholder font-semibold" >
            Field is required
          </small>
        </div>

        <div class="form-field" >
          <zInput
            v-model="userForm.address.country"
            label="Country"
            :error-state="v$.userForm.address.country.$error"
            on-error="required"
            class="mb-0.5" />

          <small class="text-placeholder font-semibold" >
            Field is required
          </small>
        </div>

        <zInput
          class="form-field"
          v-model="userForm.address.state"
          label="State" />

        <div class="form-field" >
          <zInput
            v-model="userForm.zipcode"
            label="Zipcode"
            mask="999999"
            :error-state="v$.userForm.zipcode.$error"
            on-error="required"
            class="mb-0.5" />

          <small class="text-placeholder font-semibold" >
            Field is required
          </small>
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

        <div class="form-field" >
          <zInput
            v-model="userForm.email"
            label="Email"
            :error-state="v$.userForm.email.$error"
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

        <UserContact
          v-model="userForm.contactServices" >
          <div :class="userContactTitleClasses" >
            <h5 class="leading-4" >
              Specify contact service:
            </h5>
            <small class="text-placeholder font-semibold" >
              Select at least one service
            </small>
          </div>
        </UserContact>
      </section>

      <section >
        <h4 class="mb-3.5 underline" >
          My parameters:
        </h4>

        <div class="form-field" >
          <zInput
            v-model="userForm.growth"
            label="Growth"
            :error-state="v$.userForm.growth.$error"
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
          :error-state="v$.userForm.age.$error"
          on-error="required" />
      </section>

      <template #actions >

        <div class="form-actions" >
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
import { email, required, between, minLength, url, numeric } from '@vuelidate/validators'
import { phone } from '@validators'

import UserContact from './partial/UserContact.vue'

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
        firstName: '',
        lastName: '',
        address: {
          street: '',
          city: '',
          country: '',
          state: ''
        },
        zipcode: '',
        phoneNumber: '',
        instagramUrl: '',
        email: '',
        birthDate: '',
        growth: '',
        age: '',
        bustImplants: null,
        contactServices: {}
      }
    }
  },
  computed: {
    userContactTitleClasses () {
      return {
        'text-danger': this.v$.userForm.contactServices.$error
      }
    }
  },
  methods: {
    async updateUser ( formValidationStatus ) {

    }
  },
  validations () {
    return {
      userForm: {
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        address: {
          street: {
            required,
          },
          city: {
            required
          },
          country: {
            required
          },
        },
        zipcode: {
          required,
          minLength: minLength( 6 )
        },
        phoneNumber: {
          phone
        },
        instagramUrl: {
          required,
          url
        },
        email: {
          required,
          email
        },
        growth: {
          required,
          minLength: minLength( 3 ),
          between: between( 1, 250 )
        },
        bustImplants: {
          required,
          boolean: ( val ) => val === false || val === true
        },
        contactServices: {
          atLeastOne: ( val ) => Object.keys( val ).length >= 1
        },
        age: {
          numeric,
          between: between( 18, 99 )
        },
      }
    }
  },
  components: {
    UserContact
  }
}
</script>

<style>
.form-field {
  @apply mb-7;
}

section {
  @apply mb-10;
}
</style>
