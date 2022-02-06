import deleteBrowserStorageRefresh from './deleteBrowserStorageRefresh'

export default function ( $store ) {
  deleteBrowserStorageRefresh()
  $store.commit( 'auth/clearModule' )
}
