<template >
  <zForm
    @validate="logIn"
    :form-error="formError.state"
    :on-form-error="formError.message"
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

    <div class="flex justify-between items-center mb-3" >
      <zCheckboxSingle
        v-model="rememberMe"
        label="Remember me" />

      <zLink @click="dialog$.show('resetPassword')" >
        Forget password?
      </zLink>
    </div>
    <template #actions >

      <zLoaderButton
        class="py-4 mb-3.5 md:w-48"
        type="submit"
        :loader="formLoader" >
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
import { authService } from '@services'

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
      formLoader: false,
      logInForm: {
        email: '',
        password: ''
      },
      formError: {
        state: false,
        message: ''
      },

    }
  },
  methods: {
    async logIn ( status ) {
      if ( status === STATUS_WORDS.ERROR ) {
        return
      }

      const request = await authService.login( {
        ...this.logInForm,
      } )

      console.log( request )
    }
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
