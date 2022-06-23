import store from '@/store'

function deleteBrowserStorageRefresh () {
  localStorage.removeItem( STORAGE_NAMES.REFRESH_TOKEN )
  sessionStorage.removeItem( STORAGE_NAMES.REFRESH_TOKEN )
}

export default function () {
  deleteBrowserStorageRefresh()
  store.commit( 'auth/clearModule' )
}
