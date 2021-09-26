import { helpers } from '@vuelidate/validators'

const regdate = /\d{4}\.\d{2}\.\d{2}/
export default function ( value ) {
  return !helpers.req( value ) || regdate.test( value )
}
