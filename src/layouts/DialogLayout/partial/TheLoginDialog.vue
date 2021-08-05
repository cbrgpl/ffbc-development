<template >
  <zDialog class="w-11/12 sm:w-8/12 md:w-2/4 max-w-lg" >
    <template #header >
      <h4 >Log in</h4>
    </template>
    <zSpacer space="8" ></zSpacer>

    <div class="flex flex-col items-center" >
      <zForm
        :vuelidate-object="v$" >
        <zInput
          class="input-field"
          v-model="logData.email"
          label="Email"
          :error-state="v$.logData.email.$error"
          on-error="Incorrect email format" />

        <zInput
          class="input-field"
          v-model="logData.password"
          label="Password"
          :error-state="v$.logData.password.$error"
          on-error="Password is required" />

        <zCheckboxSingle
          class="mb-8"
          v-model="rememberMe"
          label="Remember me" />

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
import { email, required } from '@validators'

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
      rememberMe: false,
      formLoader: false,
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
  components: {
    zDialog,
  }
}

</script>

<style lang="scss" scoped>

</style>
