import { app } from '@/main'

export default function ( error ) {
  const pyaloadValidationErorrs = error.responseBody

  for ( const payloadValidationError of pyaloadValidationErorrs ) {
    app.config.globalProperties.toast$.warn( { summary: error.summary, detail: payloadValidationError.message } )
  }
}
