import { required, requiredIf, requiredUnless, minLength, maxLength, minValue, maxValue, between, alpha, alphaNum, numeric, integer, decimal, email, ipAddress, macAddress, sameAs, url, or, and, not, withParams } from '@vuelidate/validators'

import dateRange from './dateRange.validator'
import password from './password.validator'

export {
  // just vuelidate validators
  required, requiredIf, requiredUnless, minLength, maxLength, minValue, maxValue, between, alpha, alphaNum, numeric, integer, decimal, email, ipAddress, macAddress, sameAs, url, or, and, not, withParams,
  dateRange,
  password

}
