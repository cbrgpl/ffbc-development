// parses all data-obs-option-* attrs
function parseOptions ( $el ) {
  const elDataAttrsArray = Object.entries( $el.dataset )
  const elObsAttrs = elDataAttrsArray
    .filter( ( dataAttr ) => dataAttr[ 0 ].includes( 'obsOption' ) )

  elObsAttrs.forEach( function ( attr ) {
    attr[ 0 ] = attr[ 0 ].replace( 'obsOption', '' )
    attr[ 0 ] = attr[ 0 ][ 0 ].toLowerCase() + attr[ 0 ].slice( 1 )
  } )

  return elObsAttrs.reduce( ( accumulator, attr ) => {
    accumulator[ attr[ 0 ] ] = attr[ 1 ]
    return accumulator
  }, {} )
}

export default class {
  constructor ( $el, effectController ) {
    // current entries accumulator
    this._accumulator = []

    // gets all visible nodes as an argument
    effectController.effect( $el, this._accumulator )
  }

  addTarget ( intersectingTarget ) {
    this._accumulator.push( {
      $node: intersectingTarget,
      params: parseOptions( intersectingTarget )
    } )
  }

  removeTarget ( target ) {
    this._accumulator.removeCallback( ( nodeParams ) => nodeParams.$node === target )

    this._accumulator.remove( target )
  }
}
