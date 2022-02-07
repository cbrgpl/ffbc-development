<template >
  <zForm
    @validate="signIn"
    :state="form.state"
    :error-message="form.errorMessage"
    :success-message="form.successMessage"
    :vuelidate-object="v$" >
    <zInput
      v-autofocus
      class="form-field"
      v-model="signInForm.email"
      label="Email"
      :error-state="v$.signInForm.email.$error"
      on-error="Incorrect email format" />

    <zTooltipInput
      class="form-field"
      type="password"
      v-model="signInForm.password"
      label="Password"
      :error-state="v$.signInForm.password.$error"
      on-error="Password does not match to requirements"
      :password-requirements="passwordRequirements" />

    <zInput
      class="form-field"
      type="password"
      v-model="signInForm.passwordConfirmation"
      label="Repeat password"
      :error-state="v$.signInForm.passwordConfirmation.$error"
      on-error="The passwords are different" />

    <zInput
      class="form-field"
      v-model="signInForm.phoneNumber"
      label="Phone number"
      mask="+9 (999) 999 99-99"
      :error-state="v$.signInForm.phoneNumber.$error"
      on-error="Invalid phone number" />

    <zCheckboxSingle
      class="form-field"
      :error-state="v$.signInForm.policyAgreement.$error"
      v-model="signInForm.policyAgreement"
      label="Consent to the processing of personal data" />
    <template #actions >
      <div class="form-actions flex flex-col justify-center lg:justify-start" >

        <zLink
          class="form-link"
          v-if="form.state"
          :disabled="resendVerificationDisabled"
          @click="sendVerificationLink" >
          Resend Verification Link
        </zLink>

        <zLoaderButton
          class="form-button"
          type="submit"
          :loader="form.loading" >
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
import { STATUS_WORDS, CLIENT_URL } from 'consts'

import { authService } from '@services'
import { deleteUnneededObjProperties } from '@functions'

import { InternalClientLogic } from '@errors'

export default {
  name: 'SignInForm',
  setup () {
    return {
      v$: useValidation()
    }
  },
  data () {
    return {
      passwordRequirements,
      signInForm: {
        email: '',
        password: '',
        passwordConfirmation: '',
        phoneNumber: '',
        policyAgreement: false,
      },
      form: {
        state: null,
        errorMessage: '',
        successMessage: '',
        loading: false,
      },
      resendVerificationDisabled: false
    }
  },
  methods: {
    async signIn ( status ) {
      this.form.state = null

      if ( status === STATUS_WORDS.ERROR ) {
        return
      }

      this.form.loading = true

      const requestPayload = this.getFormatedToBackendData( this.signInForm )
      deleteUnneededObjProperties( requestPayload, 'policyAgreement' )

      const request = await authService.signIn( {
        ...requestPayload
      } )

      this.form.loading = false

      if ( request.httpResponse.status === 200 ) {
        this.form.successMessage = request.parsedBody.message
        this.form.state = true
      } else {
        this.form.state = false
        this.form.errorMessage = request.parsedBody.error[ 0 ].message
      }
    },
    getFormatedToBackendData ( notFormattedData ) {
      const clone = Object.assign( {}, notFormattedData )

      clone.phoneNumber = '+' + clone.phoneNumber.replace( /\D/g, '' )
      clone.redirectUrl = CLIENT_URL + '/verificate'

      return clone
    },
    async sendVerificationLink () {
      const requestPayload = {
        email: this.signInForm.email,
        redirectUrl: CLIENT_URL + '/verificate'
      }
      this.resendVerificationDisabled = true
      const request = await authService.resendVerificationLink( requestPayload )

      if ( request.httpResponse.status === 200 ) {
        this.toast$.success( { summary: 'Successfully sent!', detail: 'A verification link was sent on your e-mail. \nYou can resend link in 15 seconds.' } )
        setTimeout( () => {
          this.resendVerificationDisabled = false
        }, 15000 )
      } else {
        throw new InternalClientLogic( 'Unexpected status with resend verification request' )
      }
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
        passwordConfirmation: {
          required,
          sameAsPassword: sameAs( this.signInForm.password )
        },
        phoneNumber: {
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
