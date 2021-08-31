const defaultIntlSettings = {
  dateStyle: 'short',
}

export default function ( intlSetting = defaultIntlSettings ) {
  const intl = new Intl.DateTimeFormat( 'ru-RU', intlSetting )

  return function ( time ) {
    return intl.format( new Date( time ) )
  }
}
