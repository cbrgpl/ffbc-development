<template >
  <zDialog class="w-11/12 sm:w-8/12 md:w-2/4 max-w-lg" >
    <template #header >
      <h4 >Registration</h4>
    </template>
    <zSpacer space="8" ></zSpacer>

    <div class="flex flex-col items-center" >
      <zForm
        @validate="registrate"
        :vuelidate-object="v$" >
        <zInput
          v-autofocus
          class="input-field"
          label="Email"
          :error-state="v$.regData.email.$error"
          on-error="Wrong email format"
          v-model="regData.email" />

        <!-- // TODO Сделать потом чтобы тут был инпут с подсказкой -->
        <zInput
          class="input-field"
          type="password"
          label="Password"
          :error-state="v$.regData.password.$error"
          on-error="Weak password"
          v-model="regData.password" />

        <zInput
          class="input-field"
          type="password"
          label="Repeat password"
          :error-state="v$.regData.passwordConfirmation.$error"
          on-error="Passwords are not equal"
          v-model="regData.passwordConfirmation" />

        <zInput
          class="input-field"
          label="Phone"
          mask="+9 (999) 999 99-99"
          :error-state="v$.regData.phoneNumber.$error"
          on-error="Enter full number"
          v-model="regData.phoneNumber" />

        <zCheckboxSingle
          class="mb-8"
          :error-state="v$.consent.$error"
          v-model="consent"
          label="Consent to the processing of personal data" ></zCheckboxSingle>

        <template #button >
          <div class="w-full flex justify-center lg:justify-start" >
            <zButtonLoader
              class="w-full py-4 md:w-56 lg:w-44"
              type="submit"
              :disabled="v$.$error || buttonDisabled"
              :loader="formLoader" >
              Registration
            </zButtonLoader>
          </div>
        </template>
      </zForm>

    </div>
  </zDialog>
</template>

<script>
import zDialog from '@components/composite/zDialog/zDialog.vue'

import { STORAGE_NAMES, STATUS_WORDS } from 'consts'

import useVuelidate from '@vuelidate/core'
import { getOnlyDigits } from '@filters'
import { email, required, password, sameAs } from '@validators'

import { authService } from '@services'

import NetworkAttemptError from '@/helpers/errors/networkAttemptError'

export default {
  name: 'reg-dialog',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      regData: {
        email: '',
        password: '',
        passwordConfirmation: '',
        phoneNumber: '',
        redirectUrl: '',
      },
      consent: false,
      formLoader: false,
      buttonDisabled: false,
    }
  },
  methods: {
    setLocalStorageWatcher () {
      const storageHandler = ( event ) => {
        const storageName = event.key

        if ( storageName === STORAGE_NAMES.EMAIL_VERIFICATED ) {
          localStorage.removeItem( storageName )
          localStorage.removeItem( STORAGE_NAMES.REGISTRATED_EMAIL )

          this.dialog$.hide( 'verification' )
          this.dialog$.hide( 'registration' )
          this.toast$.success( { detail: 'Your mail was successfully confirmed!', life: 7000 } )
        }
      }

      window.addEventListener( 'storage', storageHandler, { once: true } )
    },
    async registrate ( status ) {
      if ( status === STATUS_WORDS.ERROR ) {
        return
      }

      this.formLoader = true
      const dataClone = Object.assign( {}, this.regData )
      dataClone.phoneNumber = '+' + getOnlyDigits( dataClone.phoneNumber )
      const response = await authService.register( dataClone )
      this.formLoader = false

      if ( response.response.status === 200 ) {
        localStorage.setItem( STORAGE_NAMES.REGISTRATED_EMAIL, this.regData.email )
        this.setLocalStorageWatcher()

        this.toast$.success( { summary: 'Successfully sent', detail: 'A confirmation letter was sent to you. Please confirm your account to continue' } )
        this.dialog$.show( 'verification', false )

        this.buttonDisabled = true

        // TODO Проверить что навешивание ватчера нормально работает
        this.dialog$.addWatcher( 'verification', ( { unwatch } ) => {
          this.buttonDisabled = false
          unwatch()
        } )
      } else if ( response.response.status === 400 ) {
      } else {
        throw new NetworkAttemptError( response )
      }
    }
  },
  validations () {
    return {
      regData: {
        email: {
          required,
          email,
        },
        password: {
          required,
          password: password(),
        },
        passwordConfirmation: {
          required,
          sameAs: sameAs( this.regData.password )
        },
        phoneNumber: {
          phoneLength: val => getOnlyDigits( val ).length === 11
        }
      },
      consent: {
        shouldBeTrue: ( val ) => val
      }
    }
  },
  components: {
    zDialog,
  },
}

</script>

<style lang="scss" scoped>

</style>
