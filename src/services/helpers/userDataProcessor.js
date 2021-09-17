const translatableKeys = {
  firstName: 'name',
  lastName: 'surname',
  phoneNumber: 'phone',
}

export default class UserDataProcessor {
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
}
