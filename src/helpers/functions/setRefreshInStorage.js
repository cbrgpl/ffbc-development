import { STORAGE_NAMES } from 'consts'

export default function setRefreshInStorage ( refreshToken, setInLocalStorage ) {
  if ( setInLocalStorage ) {
    localStorage.setItem( STORAGE_NAMES.REFRESH_TOKEN, refreshToken )
  } else {
    sessionStorage.setItem( STORAGE_NAMES.REFRESH_TOKEN, refreshToken )
  }
}
