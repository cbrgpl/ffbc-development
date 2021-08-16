const styles = {
  error: [ 'color:#d32625', 'font-weight:500' ].join( ';' ),
  message: [ 'color:#00aba6' ].join( ';' ),
  warn: [ 'color:#fd9726' ].join( ';' ),
}

export default class {
  static object ( object, title = '' ) {
    console.log( `%c${ title }`, styles.message, object )
  }

  static error ( highlightPart, message = '', separator = '//' ) {
    const unhighlightParts = message.split( '//' )
    unhighlightParts.push( '', '' )

    console.log( `%c${ unhighlightParts[ 0 ] }` + ` %c"${ highlightPart }" ` + `%c${ unhighlightParts[ 1 ] }`, styles.message, styles.error, styles.message )
  }

  static warn ( highlightPart, message = '', separator = '//' ) {
    const unhighlightParts = message.split( '//' )
    unhighlightParts.push( '', '' )

    console.log( `%c${ unhighlightParts[ 0 ] }` + ` %c"${ highlightPart }" ` + `%c${ unhighlightParts[ 1 ] }`, styles.message, styles.warn, styles.message )
  }

  static message ( message ) {
    console.log( `%c${ message }`, styles.message )
  }
}
