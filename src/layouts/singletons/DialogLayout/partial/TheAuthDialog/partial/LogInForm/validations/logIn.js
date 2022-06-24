import { email, required } from '@vuelidate/validators'
import { getPasswordValidator } from '@validators'

export default function () {
  return {
    logInForm: {
      email: {
        email,
        required
      },
      password: {
        password: getPasswordValidator(),
        required,
      }
    }
  }
}
