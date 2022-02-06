import { STORAGE_NAMES } from 'consts'

export default function deleteBrowserStorageRefresh () {
  localStorage.removeItem( STORAGE_NAMES.REFRESH_TOKEN )
  sessionStorage.removeItem( STORAGE_NAMES.REFRESH_TOKEN )
}
