export default {
  inserted: el => {
    function loadImage () {
      if ( el.dataset.src ) {
        el.src = el.dataset.src
      } else if ( el.dataset.background ) {
        el.classList.add( el.dataset.background )
      }
    }

    function createIntersectionObserver () {
      const options = {
        root: null,
        threshold: 0
      }

      const observer = new IntersectionObserver( ( entries, observer ) => {
        entries.forEach( entry => {
          if ( entry.isIntersecting ) {
            loadImage()
            observer.unobserve( el )
          }
        } )
      }, options )

      observer.observe( el )
    }

    if ( typeof window !== 'undefined' && window.IntersectionObserver ) {
      createIntersectionObserver()
    } else {
      loadImage()
    }
  },
}
