export default function ( time, intlSetting ) {
  const intl = new Intl.DateTimeFormat( 'ru-RU', intlSetting )

  return intl.format( new Date( time ) )
}
