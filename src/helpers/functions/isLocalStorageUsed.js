export default function isLocalStorageUsed () {
  if ( localStorage.getItem( STORAGE_NAMES.REFRESH_TOKEN ) !== null ) {
    return true
  } else {
    return false
  }
}
