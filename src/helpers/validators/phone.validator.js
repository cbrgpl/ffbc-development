import { helpers } from '@vuelidate/validators'

const phoneRegexp = /\d{11}/
export default function ( value ) {
  return !helpers.req( value ) || phoneRegexp.test( value.replace( /\D/g, '' ) )
}
