import { ServiceFactory, FetcherFactory, ResponseProcessor, MimeParser } from 'ttt-rest-service'
import { onBeforeRequest, onBeforeFetch } from './helpers/defaultHooks'

import apiAuthModule from './service_metadata/authService'

const API = {
  auth: apiAuthModule
}

const defaultHooks = {
  onBeforeRequest,
  onBeforeFetch,
}

function getServices ( API ) {
  const fetcherFactory = new FetcherFactory()

  const mimeParserPairs = [
    [ 'application/json', ( httpResponse ) => httpResponse.json() ]
  ]
  const mimeParser = new MimeParser( mimeParserPairs )
  const responseProcessor = new ResponseProcessor( mimeParser )

  const serviceFactory = new ServiceFactory( fetcherFactory, responseProcessor )

  return serviceFactory.generateServices( API )
}

function setDefaultHooks ( services, hooks ) {
  for ( const serviceName in services ) {
    const service = services[ serviceName ]

    service.onBeforeRequest( hooks.onBeforeRequest )
    service.onBeforeFetch( hooks.onBeforeFetch )
  }
}

const services = getServices( API )

setDefaultHooks( services, defaultHooks )

export const {
  authService,
} = services
