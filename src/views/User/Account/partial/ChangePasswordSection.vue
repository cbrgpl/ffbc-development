<template >
  <AccountSection
    ref="account-section"
    :actions-disabled="showFormDisabled"
    @formVisibilityToggled="toggleShowFormDisabled"
    class="flex flex-col items-start"
    button-title="Change Password" >
    <template #default >
      <h4 class="mb-1 underline" >
        Password:
      </h4>
      <zButton
        disabled
        class="locale-text-white mb-4 tracking-widest font-mono px-3 py-1.5" >
        {{ randomNumberOfStars }}
      </zButton>
    </template>

    <template #action >
      <zButton
        :disabled="showFormDisabled"
        class="w-full sm:w-auto px-4 py-3.5 mb-4" >
        Change Password
      </zButton>
    </template>

    <template #form >
      <zForm
        @validate="updatePassword"
        :state="form.state"
        :error-message="form.errorMessage"
        :success-message="form.successMessage"
        :vuelidate-object="v$" >
        <zTooltipInput
          class="form-field"
          type="password"
          v-model="changePasswordForm.password"
          label="Password"
          :error-state="v$.changePasswordForm.password.$error"
          on-error="Password does not match to requirements"
          :password-requirements="passwordRequirements" />
        <zInput
          class="form-field"
          type="password"
          v-model="changePasswordForm.passwordConfirmation"
          label="Password Confirmation"
          :error-state="v$.changePasswordForm.passwordConfirmation.$error"
          on-error="Password does not match to requirements" />

        <template #actions >
          <div class="form-actions flex justify-end" >
            <zLoaderButton
              class="form-button"
              type="submit"
              :loader="form.loading" >
              Change
            </zLoaderButton>
          </div>
        </template>
      </zForm>
    </template>
  </AccountSection>
</template>

<script>
import AccountSection from './AccountSection.vue'

import useVuelidate from '@vuelidate/core'
import { required, sameAs } from '@vuelidate/validators'

import { getPasswordValidator } from '@validators'

import passwordRequirements from '@enums/info/passwordRequirements'

import { STATUS_WORDS } from 'consts'

export default {
  name: 'ChangePasswordSection',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      changePasswordForm: {
        password: '',
        passwordConfirmation: '',
      },
      form: {
        state: null,
        errorMessage: '',
        successMessage: '',
        loading: false,
      },
      showFormDisabled: false,
      passwordRequirements,
    }
  },
  computed: {
    randomNumberOfStars () {
      const maxNumOfStars = 16
      const minNumOfStars = 8
      const randomInteger = Math.round( minNumOfStars + Math.random() * ( maxNumOfStars - minNumOfStars ) )
      return '*'.repeat( randomInteger )
    }
  },
  methods: {
    async updatePassword ( formValidationResult ) {
      this.form.state = null

      if ( formValidationResult === STATUS_WORDS.ERROR ) {
        return
      }

      this.form.loading = true

      const changePasswordClone = Object.assign( {}, this.changePasswordForm )
      const dispatchResult = await this.$store.dispatch( 'auth/updatePassword', changePasswordClone )

      if ( dispatchResult.success ) {
        this.toast$.success( { summary: 'Password successfuly updated!' } )
        this.form.loading = false
        this.$refs[ 'account-section' ].clearSection()
      }
    },
    toggleShowFormDisabled () {
      this.showFormDisabled = !this.showFormDisabled
    },
  },
  validations () {
    return {
      changePasswordForm: {
        password: {
          required,
          password: getPasswordValidator()
        },
        passwordConfirmation: {
          sameAsPassword: sameAs( this.changePasswordForm.password )
        }
      }
    }
  },
  components: {
    AccountSection
  }
}
</script>

<style lang="scss" scoped>

</style>
