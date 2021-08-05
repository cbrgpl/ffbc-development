export default class {
  static getCenter ( element ) {
    const elRect = element.getBoundingClientRect()

    return {
      x: elRect.left + elRect.width * 0.5,
      y: elRect.top + elRect.height * 0.5
    }
  }

  static getOuterHeight ( element, margin = false ) {
    if ( element ) {
      let height = element.offsetHeight

      if ( margin ) {
        const style = element.style

        height += style.marginTop + style.marginBottom
      }

      return height
    }

    return 0
  }

  static getOuterWidth ( element, margin = false ) {
    if ( element ) {
      let width = element.offsetWidth

      if ( margin ) {
        const style = element.style
        width += style.leftMargin + style.rightMargin
      }

      return width
    }
    return 0
  }

  static getOuterOffset ( element, margin = false ) {
    const edges = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }

    if ( element ) {
      const boundingClientRect = element.getBoundingClientRect()
      const viewport = this.getViewport()

      edges.top += boundingClientRect.top
      edges.left += boundingClientRect.left
      edges.bottom += viewport.height - boundingClientRect.bottom
      edges.right += viewport.width - boundingClientRect.right

      if ( margin ) {
        const style = element.style

        edges.top += style.marginTop
        edges.left += style.marginLeft
        edges.bottom += style.marginBottom
        edges.right += style.marginRight
      }

      return edges
    }

    return edges
  }

  static getViewport () {
    const win = window
    const e = document.documentElement
    const g = document.getElementsByTagName( 'body' )[ 0 ]

    const w = win.innerWidth || e.clientWidth || g.clientWidth
    const h = win.innerHeight || e.clientHeight || g.clientHeight

    return { width: w, height: h }
  }

  static fadeIn ( element, duration ) {
    element.style.opacity = 0

    let opacity = 0
    let last = +new Date()

    const tick = function () {
      opacity = +element.style.opacity + ( new Date().getTime() - last ) / duration
      element.style.opacity = opacity
      last = +new Date()

      if ( +opacity < 1 ) {
        ( window.requestAnimationFrame && requestAnimationFrame( tick ) ) || setTimeout( tick, 16 )
      }
    }

    tick()
  }

  static fadeOut ( element, duration, finishCallback = () => {} ) {
    element.style.opacity = 1
    let opacity = 1
    let last = +new Date()

    const tick = function () {
      opacity = +element.style.opacity - ( new Date().getTime() - last ) / duration
      element.style.opacity = opacity
      last = +new Date()

      if ( +opacity > 0 ) {
        ( window.requestAnimationFrame && requestAnimationFrame( tick ) ) || setTimeout( tick, 16 )
      } else {
        finishCallback( element )
      }
    }

    tick()
  }

  static getScrollableParents ( element ) {
    return this._getParents( element, ( node ) => {
      const overflowY = window.getComputedStyle( node ).overflowY
      const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden'
      return isScrollable & node.scrollHeight > node.clientHeight
    } )
  }

  static addClass ( el, style ) {
    el.classList.add( style )
  }

  static addMultipleClass ( el, styles ) {
    styles.split( ' ' ).forEach( style => {
      if ( !el.classList.contains( style ) ) {
        el.classList.add( style )
      }
    } )
  }

  static removeMultipleClass ( el, styles ) {
    styles.split( ' ' ).forEach( style => {
      if ( el.classList.contains( style ) ) {
        el.classList.remove( style )
      }
    } )
  }

  static _getParents ( element, callback, accumulator = [] ) {
    if ( element === null || !callback ) {
      return accumulator
    }
    let currentElement = element

    do {
      if ( callback( currentElement ) ) {
        accumulator.push( currentElement )
      }

      currentElement = currentElement.parentNode
    } while ( currentElement !== document.body )

    return accumulator
  }
}
