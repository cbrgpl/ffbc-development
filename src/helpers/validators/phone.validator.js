import { helpers } from '@vuelidate/validators'
import { getBackendFormatPhone } from '@filters'

const phoneRegexp = /\+\d{11}/
export default function ( value ) {
  const backendFormat = getBackendFormatPhone( value )
  return !helpers.req( value ) || phoneRegexp.test( backendFormat )
}
