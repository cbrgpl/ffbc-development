export default class GuardMetaAccesser {
  constructor ( metaProp ) {
    this.metaProp = metaProp
  }

  handleCurrentMatch ( matched ) {
    const nonCalledMatches = this.getNonCalledMatches( matched )
    const currentMatch = nonCalledMatches[ 0 ]

    this.makeMatchDirty( currentMatch )

    if ( this.isLastMatch( nonCalledMatches ) ) {
      this.makeMatchedUndirty( matched )
    }

    return currentMatch
  }

  getNonCalledMatches ( matched ) {
    const guardedMatches = this.getGuardedMatched( matched )
    return guardedMatches.filter( ( match ) => match.meta[ this.metaProp ].called === false )
  }

  makeMatchDirty ( match ) {
    match.meta[ this.metaProp ].called = true
  }

  isLastMatch ( notCalledMatched ) {
    return notCalledMatched.length === 1
  }

  makeMatchedUndirty ( matched ) {
    const guardedMatches = this.getGuardedMatched( matched ).filter( ( match ) => !match.meta[ this.metaProp ].immutable )

    for ( const match of guardedMatches ) {
      match.meta[ this.metaProp ].called = false
    }
  }

  getGuardedMatched ( matched ) {
    return matched.filter( ( match ) => match.meta[ this.metaProp ] )
  }

  static defineParam ( value, immutable = false ) {
    return {
      value,
      called: false,
      immutable,
    }
  }
}
