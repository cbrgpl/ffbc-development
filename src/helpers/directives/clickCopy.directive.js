let tooltipClearTimeout = null

function createTooltip () {
  const $tooltip = document.createElement( 'div' )
  $tooltip.style.cssText = 'display: inline-block;height: 35px;padding: 1px 4px;position: fixed;transform: translateX(-65%) translateY(-100%);color: #fff;background: rgba(0,0,0,0.75);clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 65% 87%, 50% 75%, 0% 74%);'
  $tooltip.innerText = 'Copied to clipboard!'
  $tooltip.setAttribute( 'id', 'copy-tooltip' )
  return $tooltip
}

function getEventCoords ( event ) {
  return {
    x: event.clientX + 'px',
    y: event.clientY + 'px',
  }
}

function handleExistentTooltip ( $tooltip, clickCoords ) {
  clearTimeout( tooltipClearTimeout )

  $tooltip.style.left = clickCoords.x
  $tooltip.style.top = clickCoords.y

  tooltipClearTimeout = setTimeout( () => {
    document.body.removeChild( $tooltip )
  }, 1500 )
}

function displayTooltip ( event, clickCoords ) {
  let $tooltip = document.getElementById( 'copy-tooltip' )

  if ( $tooltip ) {
    handleExistentTooltip( $tooltip, clickCoords )
    return
  }

  $tooltip = createTooltip()

  $tooltip.style.left = clickCoords.x
  $tooltip.style.top = clickCoords.y

  document.body.appendChild( $tooltip )

  tooltipClearTimeout = setTimeout( () => {
    document.body.removeChild( $tooltip )
  }, 1500 )
}

export default {
  bind: function ( $el ) {
    let clickCoords

    $el.addEventListener( 'selectstart', ( event ) => {
      event.preventDefault()
    } )

    $el.addEventListener( 'click', ( event ) => {
      clickCoords = getEventCoords( event )
      document.execCommand( 'copy' )
    } )

    $el.addEventListener( 'copy', ( event ) => {
      event.preventDefault()

      if ( event.clipboardData ) {
        event.clipboardData.setData( 'text/plain', $el.innerText )

        displayTooltip( event, clickCoords )
      }
    } )
  }
}
