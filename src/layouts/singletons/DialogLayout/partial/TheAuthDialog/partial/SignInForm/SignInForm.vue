<template >
  <zForm
    :state="form.state"
    :error-message="form.errorMessage"
    :success-message="form.successMessage"
    :vuelidate-object="v$"
    @validate="signIn" >
    <zInput
      v-model="signInForm.email"
      v-autofocus
      class="form-field"
      label="Email"
      :error-state="v$.signInForm.email.$error"
      on-error="Incorrect email format" />

    <zTooltipInput
      v-model.trim="signInForm.password"
      class="form-field"
      type="password"
      label="Password"
      :error-state="v$.signInForm.password.$error"
      on-error="Password does not match to requirements"
      :password-requirements="passwordRequirements" />

    <zInput
      v-model.trim="signInForm.passwordConfirmation"
      class="form-field"
      type="password"
      label="Repeat password"
      :error-state="v$.signInForm.passwordConfirmation.$error"
      on-error="The passwords are different" />

    <zInput
      v-model.trim="signInForm.phoneNumber"
      class="form-field"
      label="Phone number"
      mask="+9 (999) 999 99-99"
      :error-state="v$.signInForm.phoneNumber.$error"
      on-error="Invalid phone number" />

    <zCheckboxSingle
      v-model="signInForm.policyAgreement"
      class="form-field"
      :error-state="v$.signInForm.policyAgreement.$error"
      label="Consent to the processing of personal data" />
    <template #actions >
      <div class="form-actions flex flex-col justify-center lg:justify-start" >
        <zLink
          v-if="isFormSuccessed"
          class="form-link"
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

<script >
import useValidation from '@vuelidate/core'
import signInValidation from './validation/signIn'

import passwordRequirements from '@enums/info/passwordRequirements'

import { deleteUnneededObjProperties } from '@functions'

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
  computed: {
    isFormSuccessed () {
      return this.form.state
    }
  },
  watch: {
    'signInForm.email': function resetFormValidation () {
      this.form.state = null
    }
  },
  methods: {
    async signIn ( status ) {
      this.form.state = null

      if ( status === STATUS_WORDS.ERROR ) {
        return
      }

      this.form.loading = true

      const signInForm = this.getFormatedToBackendData( this.signInForm )
      deleteUnneededObjProperties( signInForm, 'policyAgreement' )

      const signInDispatch = await this.$store.dispatch( 'auth/outSignIn', signInForm )

      this.form.loading = false

      if ( signInDispatch.success ) {
        this.form.successMessage = signInDispatch.data.message
        this.form.state = true
      } else {
        this.form.errorMessage = signInDispatch.data.errors[ 0 ].message
        this.form.state = false
      }
    },
    getFormatedToBackendData ( notFormattedData ) {
      const clone = Object.assign( {}, notFormattedData )

      clone.phoneNumber = '+' + clone.phoneNumber.replace( /\D/g, '' )
      clone.redirectUrl = REDIRECT_URLS.VERIFICATE_EMAIL

      return clone
    },
    async sendVerificationLink () {
      const requestPayload = {
        email: this.signInForm.email,
        redirectUrl: REDIRECT_URLS.VERIFICATE_EMAIL
      }

      this.resendVerificationDisabled = true

      await this.$store.dispatch( 'auth/resendVerificationLink', requestPayload )

      this.toast$.success( { summary: 'Successfully sent!', detail: 'A verification link was sent on your e-mail. \nYou can resend link in 15 seconds.' } )
      this.enableResendLink( 15000 )
    },
    enableResendLink ( timeMs ) {
      setTimeout( () => {
        this.resendVerificationDisabled = false
      }, timeMs )
    }
  },
  validations: signInValidation
}
</script>

<style >

</style>
