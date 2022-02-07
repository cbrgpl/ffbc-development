import { STORAGE_NAMES } from 'consts'

function deleteBrowserStorageRefresh () {
  localStorage.removeItem( STORAGE_NAMES.REFRESH_TOKEN )
  sessionStorage.removeItem( STORAGE_NAMES.REFRESH_TOKEN )
}

export default function ( $store ) {
  deleteBrowserStorageRefresh()
  $store.commit( 'auth/clearModule' )
}
