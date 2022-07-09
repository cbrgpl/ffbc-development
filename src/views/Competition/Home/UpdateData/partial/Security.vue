<template >
  <div class="bg-black-lighten rounded-lg px-4 py-4 max-w-lg" >
    <h3 class="mb-4" >
      Change the password:
    </h3>
    <zForm
      class="flex flex-col"
      :vuelidate-object="v$"
      @validate="updatePassword" >
      <div class="flex flex-col sm:flex-row justify-around mb-5" >
        <zInput
          v-model="password"
          label="Password"
          class="sm:mr-5" />

        <zInput
          v-model="password"
          label="Confirm Password" />
      </div>
      <zLoaderButton
        class="w-44 py-3.5 ml-auto"
        :loader="formLoader"
        variant="ghost"
        text="Change" />
    </zForm>
  </div>
</template>

<script >
import { useVuelidate } from '@vuelidate/core'
import { required, password } from '@validators'

export default {
  name: 'Security',
  data () {
    return {
      password: '',
      formLoader: false,
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      password: {
        required,
        password
      }
    }
  },
  methods: {
    updatePassword ( status ) {
      if ( status === STATUS_WORDS.ERROR ) {
        return
      }

      this.formLoader = true
    }
  }
}
</script>

<style >

</style>
