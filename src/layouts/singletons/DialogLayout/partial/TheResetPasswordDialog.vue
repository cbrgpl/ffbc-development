<template >
  <zDialog class="w-11/12 sm:w-8/12 md:w-2/4 max-w-xs" >
    <template #header >
      <h4 >Reset Password</h4>
    </template>
    <zSpacer space="2" ></zSpacer>

    <zForm
      @validate="sendCode"
      :state="form.state"
      :error-message="form.errorMessage"
      :vuelidate-object="v$" >
      <zInput
        v-autofocus
        class="mb-8"
        v-model="email"
        label="Email"
        :error-state="v$.email.$error"
        on-error="Incorrect email format" />

      <template #actions >

        <zLoaderButton
          class="w-full py-4 md:w-48 mt-1.5"
          type="submit"
          :loader="form.loading" >
          Send mail
        </zLoaderButton>

      </template>
    </zForm>
  </zDialog>
</template>
<script>
import zDialog from '@components/composite/zDialog/zDialog.vue'

import useVuelidate from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

export default {
  name: 'TheResetPasswordDialog',
  data () {
    return {
      email: '',
      v$: useVuelidate(),
      form: {
        state: null,
        errorMessage: '',
        loading: false,
      },
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
      this.form.state = null

      if ( status === STATUS_WORDS.ERROR ) {
        return
      }

      this.form.loading = true

      const resetCodeForm = {
        email: this.email,
        redirectUrl: REDIRECT_URLS.RESET_PASSWORD
      }

      const resetCodeResult = await this.$store.dispatch( 'auth/outSendResetCode', resetCodeForm )

      this.form.loading = false

      if ( resetCodeResult.success ) {
        this.toast$.success( { summary: 'An e-mail was sent to you', detail: 'The password change reference was sent to your email' } )
        this.dialog$.hide( 'resetPassword' )
      } else {
        this.form.state = false
        this.form.errorMessage = resetCodeResult.data.errors[ 0 ].message
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
