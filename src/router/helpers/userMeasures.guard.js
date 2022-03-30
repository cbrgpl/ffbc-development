import store from '@/store'

export default async function ( to, from ) {
  const isAuth = store.getters[ 'auth/isAuth' ]

  if ( isAuth ) {
    await store.dispatch( 'measure/fetchUserMeasures' )
  }
}
