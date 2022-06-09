const OBSERVABLE_ATTR = 'observable'

const getDirective = ( addObservable ) => {
  return {
    created: ( $el, bindings ) => {
      $el.setAttribute( `data-${ OBSERVABLE_ATTR }`, bindings.value )

      addObservable( bindings.value )
    }
  }
}

export {
  getDirective,
  OBSERVABLE_ATTR
}
