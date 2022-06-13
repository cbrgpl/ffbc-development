import store from '@/store'

export default function ( guard ) {
  return async ( to, from, next ) => {
    if ( process.env.VUE_APP_IGNORE_BACKEND === 'true' ) {
      store.commit( 'app/userLoaded', true )

      if ( next ) {
        next()
      }

      return true
    } else {
      return guard( to, from, next )
    }
  }
}
