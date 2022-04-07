/* eslint-disable camelcase */
import getUniqueComponentId from '@/helpers/functions/getUniqueComponentId.js'
import DomHandler from '@classes/DomHandler.class.js'

// v-tooltip.side[top||bottom||left||right].focus.margin(in px)

function parseModifiers ( el ) {
  const directions = [ 'top', 'right', 'bottom', 'left' ]

  const modifiers = el.$_ztooltipModifiers
  const defaultModifiers = {
    offset: 10,
    direction: 'top',
    focus: false
  }
  for ( const modifier of Object.entries( modifiers ) ) {
    if ( !isNaN( modifier[ 0 ] ) ) {
      defaultModifiers.offset = Number( modifier[ 0 ] )
    } else if ( directions.includes( modifier[ 0 ] ) ) {
      defaultModifiers.direction = modifier[ 0 ]
    } else if ( modifier[ 0 ] === 'focus' ) {
      defaultModifiers.focus = true
    }
  }

  return defaultModifiers
}

function bindEvents ( el ) {
  const modifiers = parseModifiers( el )

  if ( modifiers.focus ) {
    el.addEventListener( 'focusin', onFocusin )
    el.addEventListener( 'focusout', onFocusout )
  } else {
    el.addEventListener( 'mouseenter', onMouseEnter )
    el.addEventListener( 'mouseleave', onMouseLeave )
    el.addEventListener( 'click', onClick )
  }
}

function unbindEvents ( el ) {
  const modifiers = parseModifiers( el )

  if ( modifiers.focus ) {
    el.removeEventListener( 'focus', onFocusin )
    el.removeEventListener( 'blur', onFocusout )
  } else {
    el.removeEventListener( 'mouseenter', onMouseEnter )
    el.removeEventListener( 'mouseleave', onMouseLeave )
    el.removeEventListener( 'click', onClick )
  }
}

function bindScrollEvents ( el ) {
  const scrollableParents = DomHandler.getScrollableParents( el )
  el.$_scrollListener = ( event ) => onScroll( el )

  scrollableParents.forEach( parent => parent.addEventListener( 'scroll', el.$_scrollListener ) )
}

function unbindScrollEvents ( el ) {
  const scrollableParents = DomHandler.getScrollableParents( el )
  scrollableParents.forEach( parent => parent.removeEventListener( 'scroll', el.$_scrollListener ) )
  el.$_scrollListener = null
}

function onFocusin ( event ) {
  show( event.currentTarget )
}

function onScroll ( el ) {
  hideSymbols( el )
}

function onFocusout ( event ) {
  hideSymbols( event.currentTarget )
}

function onMouseEnter ( event ) {
  show( event.currentTarget )
}

function onMouseLeave ( event ) {
  hideSymbols( event.currentTarget )
}

function onClick ( event ) {
  hideSymbols( event.currentTarget )
}

function show ( el ) {
  const tooltip = createTooltip( el )
  const modifiers = parseModifiers( el )

  align( el, modifiers )
  DomHandler.fadeIn( tooltip, 200 )

  bindScrollEvents( el )
}

function hideSymbols ( el ) {
  remove( el )

  if ( el.$_scrollListener ) {
    unbindScrollEvents( el )
  }
}

function remove ( el ) {
  if ( el ) {
    const tooltipElement = getTooltipElement( el )

    if ( tooltipElement && tooltipElement.parentElement ) {
      tooltipElement.parentElement.removeChild( tooltipElement )
    }

    el.$_ztooltipId = null
  }
}

function createTooltip ( el ) {
  const container = document.createElement( 'div' )

  const id = getUniqueComponentId() + '_tooltip'
  el.$_ztooltipId = id
  container.id = id

  const tooltipText = document.createElement( 'span' )
  tooltipText.classList.add( 'z-tooltip-inner' )

  tooltipText.innerHTML = el.$_ztooltipValue

  container.appendChild( tooltipText )

  container.style.display = 'inline-block'
  document.body.appendChild( container )

  return container
}

function align ( el, modifiers ) {
  if ( modifiers.direction === 'top' ) {
    alignTop( el, modifiers )
    if ( isOutOfBounds( el ) ) {
      alignBottom( el, modifiers )
    }
  } else if ( modifiers.direction === 'right' ) {
    alignRight( el, modifiers )

    if ( isOutOfBounds( el ) ) {
      alignLeft( el, modifiers )

      if ( isOutOfBounds( el ) ) {
        alignTop( el, modifiers )

        if ( isOutOfBounds( el ) ) {
          alignBottom( el, modifiers )
        }
      }
    }
  } else if ( modifiers.direction === 'bottom' ) {
    alignBottom( el, modifiers )

    if ( isOutOfBounds( el ) ) {
      alignTop( el, modifiers )
    }
  } else if ( modifiers.direction === 'left' ) {
    alignLeft( el, modifiers )

    if ( isOutOfBounds( el ) ) {
      alignRight( el, modifiers )

      if ( isOutOfBounds( el ) ) {
        alignTop( el, modifiers )

        if ( isOutOfBounds( el ) ) {
          alignBottom( el, modifiers )
        }
      }
    }
  }
}

function alignTop ( el, modifiers ) {
  const tooltip = getTooltipElement( el )
  prealign( tooltip, 'top' )
  const hostOffset = DomHandler.getOuterOffset( el )

  tooltip.style.left = hostOffset.left + ( DomHandler.getOuterWidth( el ) - DomHandler.getOuterWidth( tooltip ) ) / 2 + 'px'
  tooltip.style.top = hostOffset.top - DomHandler.getOuterHeight( tooltip ) - modifiers.offset + 'px'
}

function alignRight ( el, modifiers ) {
  const tooltip = getTooltipElement( el )
  prealign( tooltip, 'top' )
  const hostOffset = DomHandler.getOuterOffset( el )

  tooltip.style.left = hostOffset.left + DomHandler.getOuterWidth( el ) + modifiers.offset + 'px'
  tooltip.style.top = hostOffset.top + ( DomHandler.getOuterHeight( el ) - DomHandler.getOuterHeight( tooltip ) ) / 2 + 'px'
}

function alignBottom ( el, modifiers ) {
  const tooltip = getTooltipElement( el )
  prealign( tooltip, 'top' )
  const hostOffset = DomHandler.getOuterOffset( el )

  tooltip.style.left = hostOffset.left + ( DomHandler.getOuterWidth( el ) - DomHandler.getOuterWidth( tooltip ) ) / 2 + 'px'
  tooltip.style.top = hostOffset.top + DomHandler.getOuterHeight( el ) + modifiers.offset + 'px'
}

function alignLeft ( el, modifiers ) {
  const tooltip = getTooltipElement( el )
  prealign( tooltip, 'top' )
  const hostOffset = DomHandler.getOuterOffset( el )

  tooltip.style.left = hostOffset.left - ( DomHandler.getOuterWidth( tooltip ) + modifiers.offset ) + 'px'
  tooltip.style.top = hostOffset.top + ( DomHandler.getOuterHeight( el ) - DomHandler.getOuterHeight( tooltip ) ) / 2 + 'px'
}

function prealign ( tooltip, position ) {
  tooltip.style.left = '-999px'
  tooltip.style.top = '-999px'
  DomHandler.addMultipleClass( tooltip, `z-tooltip z-tooltip-${ position }` )
}

function isOutOfBounds ( el ) {
  const tooltip = getTooltipElement( el )
  const tooltipOffset = DomHandler.getOuterOffset( tooltip )

  return Object.entries( tooltipOffset ).some( ( offsetSide ) => offsetSide[ 1 ] < 0 )
}

function getTooltipElement ( el ) {
  return document.getElementById( el.$_ztooltipId )
}

export default {
  beforeMount ( el, options ) {
    el.$_ztooltipModifiers = options.modifiers
    el.$_ztooltipValue = options.value

    bindEvents( el )
  },
  unmounted ( el ) {
    if ( el.$_ztooltipId ) {
      remove( el )
    }

    unbindEvents( el )
  },
  update ( el, options ) {
    unbindEvents( el )

    el.$_ztooltipModifiers = options.modifiers
    el.$_ztooltipValue = options.value
    bindEvents( el )
  }
}
