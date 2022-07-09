import store from '@/store'

export default async () => {
  store.commit( 'app/subAppLoaded', false )
}
