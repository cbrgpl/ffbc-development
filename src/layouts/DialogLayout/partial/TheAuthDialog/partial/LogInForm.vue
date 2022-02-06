<template >
  <zForm
    @validate="logIn"
    :state="form.state"
    :error-message="form.errorMessage"
    :success-message="form.successMessage"
    :vuelidate-object="v$" >
    <zInput
      v-autofocus
      class="mb-5"
      v-model="logInForm.email"
      label="Email"
      :error-state="v$.logInForm.email.$error"
      on-error="Incorrect email format" />

    <zInput
      class="mb-5"
      type="password"
      v-model="logInForm.password"
      label="Password"
      :error-state="v$.logInForm.password.$error"
      on-error="Password is required" />

    <div class="flex justify-between items-center mb-8" >
      <zCheckboxSingle
        v-model="rememberMe"
        label="Remember me" />

      <zLink @click="dialog$.show('resetPassword')" >
        Forget password?
      </zLink>
    </div>
    <template #actions >

      <zLoaderButton
        class="py-4 mb-3.5 md:w-48 mt-1.5"
        type="submit"
        :loader="form.loading" >
        Log in
      </zLoaderButton>

    </template>
  </zForm>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { getPasswordValidator } from '@validators'

import { STATUS_WORDS } from 'consts'
import { setRefreshInStorage } from '@functions'
import { authService } from '@services'
import { getUserServiceCommand, SetUserCommand, SetAuthorizeInfoCommand } from '@commands'

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
    async logIn ( formValidateStatus ) {
      this.form.state = null

      if ( formValidateStatus === STATUS_WORDS.ERROR ) {
        return
      }

      this.form.loading = true

      const request = await authService.logIn( {
        ...this.logInForm,
      } )

      this.form.loading = false

      if ( request.httpResponse.status === 200 ) {
        setRefreshInStorage( request.parsedBody.tokens.refresh, this.rememberMe )
        const setAuthorizeInfoCommand = new SetAuthorizeInfoCommand( this.$store, request.parsedBody )
        setAuthorizeInfoCommand.execute()

        const userData = await getUserServiceCommand.execute()

        const saveUserCommand = new SetUserCommand( this.$store, userData )
        saveUserCommand.execute()

        this.dialog$.hide( 'auth' )
      } else {
        this.form.state = false
        this.form.errorMessage = request.parsedBody.errors[ 0 ].message
      }
    },
  },
  validations () {
    return {
      logInForm: {
        email: {
          email,
          required
        },
        password: {
          password: getPasswordValidator(),
          required,
        }
      }
    }
  }

}
</script>

<style>

</style>
