import store from '@/store'

export default function ( guard ) {
  store.commit( 'app/userLoaded', true )

  return async ( to, from, next ) => {
    if ( !process.env.VUE_APP_IGNORE_BACKEND ) {
      return guard( to, from, next )
    } else {
      if ( next ) {
        next()
      }

      return true
    }
  }
}
