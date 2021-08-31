const MODS = {
  KEBAB_CAMEL: 'KC',
  CAMEL_KEBAB: 'CK'
}

// TODO Заменить на по-настоящему приватные методы
export default class CamelKebabTranslator {
  static camelKebabKey ( key ) {
    return this._translateString( key, MODS.CAMEL_KEBAB )
  }

  static kebabCamelKey ( key ) {
    return this._translateString( key, MODS.KEBAB_CAMEL )
  }

  static camelKebabArray ( foreignArray ) {
    for ( const elem of foreignArray ) {
      if ( elem instanceof Object ) {
        this.camelKebabObj( elem )
      }
    }
  }

  static kebabCamelArray ( foreignArray ) {
    for ( const elem of foreignArray ) {
      if ( elem instanceof Object ) {
        this.kebabCamelObj( elem )
      }
    }
  }

  static camelKebabObj ( foreignObj ) {
    const translatedObject = {}

    for ( const key of Object.keys( foreignObj ) ) {
      const kebabedKey = this._translateString( key, MODS.CAMEL_KEBAB )

      translatedObject[ kebabedKey ] = foreignObj[ key ]

      if ( translatedObject[ kebabedKey ] instanceof Object ) {
        this.camelKebabObj( translatedObject[ kebabedKey ] )
      } else if ( Array.isArray( translatedObject[ kebabedKey ] ) ) {
        this.camelKebabArray( translatedObject[ kebabedKey ] )
      }
    }

    return translatedObject
  }

  static kebabCamelObj ( foreignObj ) {
    const translatedObject = {}

    for ( const key of Object.keys( foreignObj ) ) {
      const cameledKey = this._translateString( key, MODS.KEBAB_CAMEL )

      translatedObject[ cameledKey ] = foreignObj[ key ]

      if ( translatedObject[ cameledKey ] instanceof Object ) {
        this.camelKebabObj( translatedObject[ cameledKey ] )
      } else if ( Array.isArray( translatedObject[ cameledKey ] ) ) {
        this.camelKebabArray( translatedObject[ cameledKey ] )
      }
    }

    return translatedObject
  }

  static _translateString ( key, mode ) {
    if ( mode === MODS.KEBAB_CAMEL ) return this._toCamel( key )
    if ( mode === MODS.CAMEL_KEBAB ) return this._toKebab( key )
  }

  static _toKebab ( key ) {
    let kebabedKey = key

    const upperCaseSymbols = RegExp( /[A-Z]/g )
    const matches = [ ...key.matchAll( upperCaseSymbols ) ]
    const matchesLastIndex = matches.length - 1

    for ( let i = matchesLastIndex; i >= 0; --i ) {
      const underlineIndex = matches[ i ].index

      kebabedKey = kebabedKey.slice( 0, underlineIndex ) + '_' + kebabedKey[ underlineIndex ].toLowerCase() + kebabedKey.slice( underlineIndex + 1, kebabedKey.length )
    }

    return kebabedKey
  }

  static _toCamel ( key ) {
    let cameledKey = key

    const underlineReg = RegExp( '_', 'g' )
    const matches = [ ...key.matchAll( underlineReg ) ]
    const matchesLastIndex = matches.length - 1

    for ( let i = matchesLastIndex; i >= 0; --i ) {
      const underlineIndex = matches[ i ].index

      cameledKey = cameledKey.slice( 0, underlineIndex ) + cameledKey[ underlineIndex + 1 ].toUpperCase() + cameledKey.slice( underlineIndex + 2, cameledKey.length )
    }

    return cameledKey
  }
}
