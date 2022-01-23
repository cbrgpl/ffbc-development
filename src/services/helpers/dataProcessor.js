
export default class UserDataProcessor {
  constructor ( fieldsFilters ) {
    this.fieldsFilters = fieldsFilters
  }

  applyFilters ( data ) {
    for ( const field of Object.keys( this.fieldsFilters ) ) {
      data[ field ] = this._applyFiltersToField( field, data[ field ] )
    }
  }

  _applyFiltersToField ( field, initialValue ) {
    let value = initialValue

    for ( const filter of this.fieldsFilters[ field ] ) {
      value = filter( value )
    }

    return value
  }
}

/*

  // left to right
  static fromBackend ( userData ) {
    const backendKeys = Object.keys( translatableKeys )

    for ( const backendKey of backendKeys ) {
      UserDataProcessor._replacePair( userData, backendKey, translatableKeys[ backendKey ] )
    }
  }

  static _replacePair ( obj, oldKey, newKey ) {
    obj[ newKey ] = obj[ oldKey ]
    delete obj[ oldKey ]
  }

  // right to left
  static fromFrontend ( userData ) {
    const backendKeys = Object.keys( translatableKeys )

    for ( const backendKey of backendKeys ) {
      UserDataProcessor._replacePair( userData, translatableKeys[ backendKey ], backendKey )
    }
  }

*/
