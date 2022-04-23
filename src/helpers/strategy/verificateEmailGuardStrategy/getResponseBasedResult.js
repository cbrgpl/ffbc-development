export default ( status ) => {
  const guardParams = {
    detail: null,
    nextRoute: null,
    state: null
  }

  if ( status === 200 ) {
    guardParams.detail = 'Your mail was successfully confirmed!'
    guardParams.nextRoute = 'ShopTmp'
    guardParams.state = 'fulfilled'
  } else if ( status === 400 ) {
    guardParams.detail = 'An error occurred while validating the email.<br><b>The link may have expired.</b>'
    guardParams.nextRoute = 'ShopTmp'
    guardParams.state = 'rejected'
  } else {
    guardParams.nextRoute = 'ServerDisabled'
  }

  return guardParams
}
