<template >
  <zDialog class="w-11/12 sm:w-8/12 md:w-2/4 max-w-lg" >
    <template #header >
      <h4 >Registration</h4>
    </template>
    <zSpacer space="8" ></zSpacer>

    <div class="flex flex-col items-center" >
      <zForm :vuelidate-object="v$" >
        <zInput
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
import useVuelidate from '@vuelidate/core'
import { onlyDigits } from '@filters'
import { email, required, password, sameAs } from '@validators'

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
        redirectUrl: ''
      },
      consent: false,
      formLoader: false,
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
          phoneLength: val => onlyDigits( val ).length === 11
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
