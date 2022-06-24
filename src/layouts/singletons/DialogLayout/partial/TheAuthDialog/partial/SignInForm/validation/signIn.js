import { email, required, sameAs } from '@vuelidate/validators'
import { getPasswordValidator, phone } from '@validators'

export default function ( ) {
  return {
    signInForm: {
      email: {
        required,
        email
      },
      password: {
        required,
        password: getPasswordValidator()
      },
      passwordConfirmation: {
        required,
        sameAsPassword: sameAs( this.signInForm.password )
      },
      phoneNumber: {
        required,
        phone
      },
      policyAgreement: {
        isTrue: ( val ) => val
      }
    }
  }
}
