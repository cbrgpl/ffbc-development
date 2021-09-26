import { helpers } from '@vuelidate/validators'
import { backendPhone } from '@filters'

const phoneRegexp = /\+\d{11}/
export default function ( value ) {
  const backendFormat = backendPhone( value )
  return !helpers.req( value ) || phoneRegexp.test( backendFormat )
}
