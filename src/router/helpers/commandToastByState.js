import { ErrorWithDescription } from '@errors'

export default async ( app, commandResult ) => {
  const toastArgs = {
    detail: commandResult.detail,
    life: 6000
  }

  if ( commandResult.state === 'fulfilled' ) {
    app.config.globalProperties.toast$.success( toastArgs )
  } else if ( commandResult.state === 'rejected' ) {
    app.config.globalProperties.toast$.error( toastArgs )
  } else {
    throw new ErrorWithDescription( `CommandResult state value is not expected; value is "${ commandResult.state }"` )
  }
}
