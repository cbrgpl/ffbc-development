export default function ( message, throwingObject = null ) {
  throw {
    payload: throwingObject,
    error: new Error( message )
  }
}
