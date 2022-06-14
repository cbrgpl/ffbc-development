class ObservableDirective {
  nodeBuffer = []

  static OBSERVABLE_ATTR = 'observable'

  constructor ( addObservable ) {
    this.addObservable = addObservable
  }

  clearNodeBuffer () {
    this.nodeBuffer.splice( 0 )
  }

  get vueDirective () {
    return {
      created: ( $el, bindings ) => {
        $el.setAttribute( `data-${ ObservableDirective.OBSERVABLE_ATTR }`, bindings.value )

        this.nodeBuffer.push( $el )

        this.addObservable( bindings.value )
      }
    }
  }
}

export {
  ObservableDirective,
}
