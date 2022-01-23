import { helpers } from '@vuelidate/validators'

export default function ( value ) {
  const eightheenPaste = new Date()
  eightheenPaste.setFullYear( eightheenPaste.getFullYear() - 18 )

  return !helpers.req( value ) || new Date( value.replace( /\D/g, '/' ) ) < eightheenPaste
}
