<template >
  <zDialog class="w-11/12 sm:w-8/12 md:w-2/4 max-w-xs" >
    <template #header >
      <h4 >Reset Password</h4>
    </template>
    <zSpacer space="2" ></zSpacer>

    <zForm
      @validate="sendCode"
      :vuelidate-object="v$" >
      <zInput
        v-autofocus
        class="mb-10"
        v-model="email"
        label="Email"
        :error-state="v$.email.$error"
        on-error="Incorrect email format" />

      <template #button >

        <zButtonLoader
          class="w-full py-4 md:w-48 self-start"
          type="submit"
          :loader="formLoader" >
          Send mail
        </zButtonLoader>

      </template>
    </zForm>
  </zDialog>
</template>
<script>
import zDialog from '@components/composite/zDialog/zDialog.vue'

import useVuelidate from '@vuelidate/core'
import { email, required } from '@validators'

import { authService } from '@services'
import { STATUS_WORDS } from 'consts'

export default {
  name: 'TheResetPasswordDialog',
  data () {
    return {
      email: '',
      formLoader: false,
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      email: {
        required,
        email,
      }
    }
  },
  methods: {
    async sendCode ( status ) {
      if ( status === STATUS_WORDS.ERROR ) {
        return
      }

      this.formLoader = true
      const requestResponse = await authService.requestResetPassword( {
        email: this.email,
        redirectUrl: 'reset-password'
      } )
      this.formLoader = false

      if ( requestResponse.response.status === 200 ) {
        this.toast$.success( { summary: 'An e-mail was sent to you', detail: 'The password change reference was sent to your email' } )
        this.dialog$.hide( 'resetPassword' )
      } else if ( requestResponse.response.status === 429 ) {
        this.throw$( 'status is 429', requestResponse )
      } else {
        this.toast$.error( { summary: 'Something went wrong', detail: 'When trying to send a letter something went wrong, try again later' } )
      }
    }
  },
  components: {
    zDialog,
  }
}
</script>
<style lang="scss">

</style>
