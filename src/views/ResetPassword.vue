<template >
  <div class="h-screen flex px-2.5 md:px-4" >
    <zForm
      class="m-auto md:max-w-md"
      @validate="resetPassword"
      :state="form.state"
      :vuelidate-object="v$" >
      <zInput
        v-autofocus
        class="mb-5"
        v-model="resetPasswordForm.password"
        label="Password"
        :error-state="v$.resetPasswordForm.password.$error"
        on-error="Incorrect password format" />
      <zInput
        v-model="resetPasswordForm.passwordConfirmation"
        label="Repeat Password"
        class="mb-5 md:mb-8"
        :error-state="v$.resetPasswordForm.passwordConfirmation.$error"
        on-error="Passwords are not equal" />

      <template #actions >
        <zLoaderButton
          class="w-full py-4 mb-3.5 md:w-48 mt-1.5"
          type="submit"
          :loader="form.loading" >
          Reset
        </zLoaderButton>
      </template>
    </zForm>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, sameAs } from '@vuelidate/validators'
import { getPasswordValidator } from '@validators'

import { STATUS_WORDS } from 'consts'
import { authService } from '@services'

import { ErrorWithDescription } from '@errors'

export default {
  name: 'ResetPassword',
  props: {
    queryParams: {
      type: Object,
      required: true,
    }
  },
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      form: {
        state: null,
        loading: false,
      },
      resetPasswordForm: {
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  methods: {
    async resetPassword ( formValidateStatus ) {
      this.form.state = null

      if ( formValidateStatus === STATUS_WORDS.ERROR ) {
        return
      }

      this.form.loading = true

      const requestPayload = {
        ...this.resetPasswordForm,
        token: this.queryParams.get( 'token' ),
        uidb64: this.queryParams.get( 'uidb64' )
      }

      const request = await authService.setNewPassword( requestPayload )

      if ( request.httpResponse.status === 200 ) {
        this.toast$.success( { summary: 'The password was updated successfully' } )
      } else if ( request.httpResponse.status === 400 ) {
        this.toast$.warn( { summary: 'Something went wrong...', detail: 'Try requesting password recovery again' } )
      } else {
        throw new ErrorWithDescription( 'Got unexpected response status while reset password' )
      }

      this.$router.push( { name: 'ShopMain' } )
    }
  },
  validations () {
    return {
      resetPasswordForm: {
        password: {
          required,
          password: getPasswordValidator()
        },
        passwordConfirmation: {
          required,
          sameAsPassword: sameAs( this.resetPasswordForm.password )
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
