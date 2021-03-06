import { ServiceFactory, FetcherFactory, ResponseProcessor, MimeParser } from 'ttt-rest-service'
import { onBeforeRequest, onBeforeFetch, onResponseHandled } from './helpers/defaultHooks'

import apiAuthModule from './service_metadata/authService'
import userApiModule from './service_metadata/userService'

const API = {
  auth: apiAuthModule,
  user: userApiModule
}

const defaultHooks = {
  onBeforeRequest,
  onBeforeFetch,
  onResponseHandled
}

function getServices ( API ) {
  const fetcherFactory = new FetcherFactory()

  const mimeParserPairs = [
    [ 'application/json', ( httpResponse ) => httpResponse.json() ],
    [ 'text/html', ( httpResponse ) => httpResponse.text() ]
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
    // service.onResponseHandled( hooks.onResponseHandled )
  }
}

const services = getServices( API )

setDefaultHooks( services, defaultHooks )

export const {
  authService,
  userService
} = services
