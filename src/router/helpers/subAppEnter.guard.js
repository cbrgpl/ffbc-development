import store from '@/store'

export default async ( to, from, next ) => {
  store.commit( 'app/subAppLoaded', false )
}
