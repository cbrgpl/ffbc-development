export default function getServiceProxyAdapter ( adapter, service ) {
  const handlers = {
    get ( target, propKey, receiver ) {
      const targetValue = Reflect.get( target, propKey, receiver )

      if ( typeof targetValue === 'function' ) {
        return async function ( ...args ) {
          const result = await target[ propKey ]( ...args )

          if ( adapter.contains( propKey ) ) {
            return adapter.call( propKey, result )
          } else {
            return result
          }
        }
      }

      return targetValue
    }
  }

  return new Proxy( service, handlers )
}
