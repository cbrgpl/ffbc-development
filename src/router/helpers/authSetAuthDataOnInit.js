import updateRefreshToken from './authUpdateRefreshToken'
import updateStorageData from './authUpdateStorageData'

export default async function setAuthDataOnInit ( refreshToken ) {
  if ( refreshToken !== null ) {
    const tokens = await updateRefreshToken( refreshToken )
    updateStorageData( tokens )
  } else {
    updateStorageData( null )
  }
}
