const OBSERVABLE_ATTR = 'observable'

const getDirective = ( addObservable ) => {
  let observablesCount = 0

  return {
    created: ( $el ) => {
      const number = ++observablesCount
      $el.setAttribute( `data-${ OBSERVABLE_ATTR }`, number )

      addObservable( number )
    }
  }
}

export {
  getDirective,
  OBSERVABLE_ATTR
}
