// TODO Убрать этот бред
import { required, requiredIf, requiredUnless, minLength, maxLength, minValue, maxValue, between, alpha, alphaNum, numeric, integer, decimal, email, ipAddress, macAddress, sameAs, url, or, and, not, withParams } from '@vuelidate/validators'

import dateRange from './dateRange.validator'
import password from './password.validator'
import phone from './phone.validator'
import date from './date.validator'
import adultDate from './adultDate.validator'
import isFunction from './isFunction'

export {
  // vuelidate validators
  required, requiredIf, requiredUnless, minLength, maxLength, minValue, maxValue, between, alpha, alphaNum, numeric, integer, decimal, email, ipAddress, macAddress, sameAs, url, or, and, not, withParams,
  dateRange,
  password,
  phone,
  date,
  adultDate,
  isFunction
}
