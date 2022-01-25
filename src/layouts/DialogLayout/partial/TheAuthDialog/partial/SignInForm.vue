<template >
  <zForm
    @validate="signIn"
    :form-error="formError.state"
    :on-form-error="formError.message"
    :vuelidate-object="v$" >
    <zInput
      v-autofocus
      class="mb-5"
      v-model="signInForm.email"
      label="Email"
      :error-state="v$.signInForm.email.$error"
      on-error="Incorrect email format" />

    <zTooltipInput
      class="mb-5"
      type="password"
      v-model="signInForm.password"
      label="Password"
      :error-state="v$.signInForm.password.$error"
      on-error="Password does not match to requirements"
      :password-requirements="passwordRequirements" />

    <zInput
      class="mb-5"
      type="password"
      v-model="signInForm.repeatPassword"
      label="Repeat password"
      :error-state="v$.signInForm.repeatPassword.$error"
      on-error="The passwords are different" />

    <zInput
      class="mb-5"
      v-model="signInForm.phone"
      label="Phone number"
      mask="+9 (999) 999 99-99"
      :error-state="v$.signInForm.phone.$error"
      on-error="Invalid phone number" />

    <zCheckboxSingle
      class="mb-8"
      :error-state="v$.signInForm.policyAgreement.$error"
      v-model="signInForm.policyAgreement"
      label="Consent to the processing of personal data" />
    <template #actions >

      <div class="flex flex-col justify-center lg:justify-start mt-10" >

        <zLoaderButton
          class="w-full py-4 mb-3.5 md:w-48"
          type="submit"
          :loader="formLoader" >
          Sign In
        </zLoaderButton>

      </div>
    </template>
  </zForm>
</template>

<script>
import useValidation from '@vuelidate/core'
import { email, required, sameAs } from '@vuelidate/validators'
import { getPasswordValidator, phone } from '@validators'

import passwordRequirements from '@enums/info/passwordRequirements'
import { STATUS_WORDS } from 'consts'

export default {
  name: 'SignInForm',
  setup () {
    return {
      v$: useValidation()
    }
  },
  data () {
    return {
      formLoader: false,
      passwordRequirements,
      signInForm: {
        email: '',
        password: '',
        repeatPassword: '',
        phone: '',
        policyAgreement: false,
      },
      formError: {
        state: false,
        message: ''
      },
    }
  },
  methods: {
    signIn ( status ) {
      if ( status === STATUS_WORDS.ERROR ) {
        return
      }

      const signInPayload = Object.assign( {}, this.signInForm )
      console.log( signInPayload )
    }
  },
  validations () {
    return {
      signInForm: {
        email: {
          required,
          email
        },
        password: {
          required,
          password: getPasswordValidator()
        },
        repeatPassword: {
          required,
          sameAsPassword: sameAs( this.signInForm.password )
        },
        phone: {
          required,
          phone
        },
        policyAgreement: {
          isTrue: ( val ) => val
        }
      }
    }
  }
}
</script>

<style>

</style>
