/* eslint-disable no-console */

const styles = {
  error: `
  color:#d32625;
  font-weight:500
  `,
  message: 'color:#00aba6',
  warn: 'color:#fd9726',
}

export default class Console {
  static separator = '^'

  static object ( object, title = '' ) {
    console.log( `%c${ title }`, styles.message, object )
  }

  static log ( message ) {
    console.log( `%c${ message }`, styles.message )
  }

  static error ( message ) {
    const messageParts = message.split( Console.separator )

    Console.logHighlightMessage( messageParts, styles.error )
  }

  static warn ( message ) {
    const messageParts = message.split( Console.separator )

    Console.logHighlightMessage( messageParts, styles.error )
  }

  static logHighlightMessage ( messageParts, highlightedPartStyles ) {
    const logString = Console.generateLogString( messageParts )
    const arrayOfMessageStyles = Console.generateStylesArray( messageParts.length, highlightedPartStyles )

    console.log( logString, ...arrayOfMessageStyles )
  }

  static generateLogString ( messageParts ) {
    let finalLogString = ''

    for ( const part of messageParts ) {
      finalLogString += `%c${ part }`
    }

    return finalLogString
  }

  static generateStylesArray ( messagePartsLength, highlightedPartStyles ) {
    const stylesArray = []

    for ( let i = 0; i < messagePartsLength; ++i ) {
      const messagePartStyle = i % 2 === 0 ? styles.message : highlightedPartStyles

      stylesArray.push( messagePartStyle )
    }

    return stylesArray
  }
}
