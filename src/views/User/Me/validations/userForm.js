import { required, between, minLength, url, numeric } from '@vuelidate/validators'
import { phone } from '@validators'

export default function () {
  return {
    userForm: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      street: {
        required,
      },
      city: {
        required
      },
      country: {
        required
      },
      // zipcode: {
      //   required,
      // },
      phoneNumber: {
        phone
      },
      instagramUrl: {
        required,
        url
      },
      height: {
        required,
        minLength: minLength( 3 ),
        between: between( 99, 250 )
      },
      bustImplants: {
        required,
        isBustType: ( val ) => Object.entries( this.bustType ).some( ( type ) => type[ 1 ].id === val )
      },
      contactServices: {
      },
      age: {
        numeric,
        between: between( 18, 99 )
      },
    }
  }
}
