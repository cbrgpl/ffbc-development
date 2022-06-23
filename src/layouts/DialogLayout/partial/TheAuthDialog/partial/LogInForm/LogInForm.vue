<template >
  <zForm
    @validate="logIn"
    :state="form.state"
    :error-message="form.errorMessage"
    :success-message="form.successMessage"
    :vuelidate-object="v$" >
    <zInput
      v-autofocus
      class="form-field"
      v-model.trim="logInForm.email"
      label="Email"
      :error-state="v$.logInForm.email.$error"
      on-error="Incorrect email format" />

    <zInput
      class="form-field"
      type="password"
      v-model.trim="logInForm.password"
      label="Password"
      :error-state="v$.logInForm.password.$error"
      on-error="Input correct password" />

    <div class="form-field flex justify-between flex-col sm:flex-row sm:items-center" >
      <zCheckboxSingle
        class="mb-2 sm:mb-0"
        v-model="rememberMe"
        label="Remember me" />

      <zLink @click="dialog$.show('resetPassword')" >
        Forget password?
      </zLink>
    </div>

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
</template>

<script>
import useVuelidate from '@vuelidate/core'
import logInValidation from './validations/logIn'

import { mapActions } from 'vuex'

import { setRefreshInStorage } from '@functions'

export default {
  name: 'LogInForm',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      rememberMe: true,
      logInForm: {
        email: '',
        password: ''
      },
      form: {
        state: null,
        errorMessage: '',
        successMessage: '',
        loading: false,
      },
    }
  },
  methods: {
    ...mapActions( {
      storeLogIn: 'auth/logIn',
    } ),
    async logIn ( formValidateStatus ) {
      this.form.state = null

      if ( formValidateStatus === STATUS_WORDS.ERROR ) {
        return
      }

      this.form.loading = true

      const dispatchResult = await this.$store.dispatch( 'auth/logIn', { ...this.logInForm } )

      if ( dispatchResult.success ) {
        setRefreshInStorage( dispatchResult.data.tokens.refresh, this.rememberMe )

        this.dialog$.hide( 'auth' )
      } else {
        this.form.loading = false
        this.form.state = false
        this.form.errorMessage = dispatchResult.data.errors[ 0 ].message
      }
    },
  },
  validations: logInValidation()

}
</script>

<style>

</style>
