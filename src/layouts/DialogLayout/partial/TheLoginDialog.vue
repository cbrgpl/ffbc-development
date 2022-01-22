<template >
  <zDialog class="w-11/12 sm:w-8/12 md:w-2/4 max-w-sm" >
    <template #header >
      <h4 >Log in</h4>
    </template>
    <zSpacer space="8" ></zSpacer>

    <div class="flex flex-col items-center w-full" >
      <zForm
        :form-error="formError"
        on-form-error="User with password and email combination not found"
        @validate="login"
        :vuelidate-object="v$" >
        <zInput
          v-autofocus
          class="input-field"
          v-model="logData.email"
          label="Email"
          :error-state="v$.logData.email.$error"
          on-error="Incorrect email format" />

        <!-- // TODO Сделать потом чтобы тут был инпут с подсказкой -->
        <zInput
          class="input-field"
          type="password"
          v-model="logData.password"
          label="Password"
          :error-state="v$.logData.password.$error"
          on-error="Password is required" />

        <template #button >

          <div class="flex flex-col justify-center lg:justify-start mt-10" >

            <div class="flex justify-between items-center mb-3" >
              <zCheckboxSingle
                v-model="rememberMe"
                label="Remember me" />

              <zLink @click="showResetDialog" >
                Forget password?
              </zLink>
            </div>

            <zLoaderButton
              class="w-full py-4 mb-3.5 md:w-48"
              type="submit"
              :loader="formLoader" >
              Log in
            </zLoaderButton>

          </div>
        </template>
      </zForm>
    </div>
  </zDialog>
</template>

<script>
import zDialog from '@components/composite/zDialog/zDialog.vue'

import useVuelidate from '@vuelidate/core'
import { email, required } from '@validators'

import { authService, userService } from '@services'
import { STORAGE_NAMES, STATUS_WORDS } from 'consts'

export default {
  name: 'login-dialog',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      logData: {
        email: '',
        password: ''
      },
      rememberMe: true,
      formLoader: false,
      formError: false,
    }
  },
  validations () {
    return {
      logData: {
        email: {
          email,
          required,
        },
        password: {
          required,
        }
      }
    }
  },
  methods: {
    showResetDialog () {
      this.dialog$.show( 'resetPassword' )
    },
    async login ( status ) {
      if ( status === STATUS_WORDS.ERROR ) {
        return
      }

      this.formLoader = true
      const requestData = Object.assign( {}, this.logData )
      const loginningResponse = await authService.login( requestData )

      if ( loginningResponse.response.status === 200 ) {
        if ( this.rememberMe ) localStorage.setItem( STORAGE_NAMES.REFRESH_TOKEN, loginningResponse.data.tokens.refresh )
        else sessionStorage.setItem( STORAGE_NAMES.REFRESH_TOKEN, loginningResponse.data.tokens.refresh )

        this.$store.commit( 'token/setTokens', loginningResponse.data.tokens )
        await this.requestUserData()
      } else if ( loginningResponse.response.status === 400 ) {
        this.formError = true
      } else {
        this.formLoader = false

        this.throw$( 'Manual Initiated Error' )
      }
    },
    async requestUserData () {
      const userDataResponse = await userService.me( this.$store.getters[ 'token/access' ] )

      if ( userDataResponse.response.status === 200 ) {
        this.$store.commit( 'auth/setIsAuth', true )
        this.$store.commit( 'user/setUserData', userDataResponse.data )

        this.toast$.success( { summary: 'Authorization successful' } )
        this.dialog$.hide( 'login' )
      } else {
        this.toast$.error( { summary: 'Authorization failed' } )
        authService.logout( this.$store.getters[ 'token/refresh' ] )
      }
    }
  },
  components: {
    zDialog,
  }
}

</script>

<style lang="scss" scoped>

</style>
