export default ( { minValue, maxValue } ) => ( value ) => {
  return ( minValue ? new Date( minValue ) <= new Date( value ) : true ) &
    ( maxValue ? new Date( value ) <= new Date( maxValue ) : true )
}
