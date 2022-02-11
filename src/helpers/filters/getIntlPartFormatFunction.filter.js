const defaultIntlSettings = {
  dateStyle: 'short',
}

export default function ( intlSetting = defaultIntlSettings ) {
  const intl = new Intl.DateTimeFormat( 'en-EN', intlSetting )

  return function ( time ) {
    return intl.formatToParts( new Date( time ) )
  }
}
