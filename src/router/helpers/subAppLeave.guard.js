import store from '@/store'

export default ( to, from, next ) => {
  store.commit( 'subAppLoaded', false )
}
