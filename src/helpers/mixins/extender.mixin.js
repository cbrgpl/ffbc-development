export default {
  inheritAttrs: false,
  computed: {
    wrapperAttrs () {
      return {
        ...this.styles,
        ...this.events
      }
    },
    styles () {
      return {
        class: this.$attrs.class,
        style: this.$attrs.style
      }
    },
    events () {
      const eventRegExp = /^on[A-Z][a-z]*$/

      const isPropEvent = ( val ) => eventRegExp.test( val )
      const isFunction = ( val ) => typeof val === 'function'

      const events = {}

      for ( const prop in this.dirtyAttrs ) {
        if ( isPropEvent( prop ) && isFunction( this.dirtyAttrs[ prop ] ) ) {
          events[ prop ] = this.dirtyAttrs[ prop ]
        }
      }

      return events
    },
    dirtyAttrs () {
      const { style, class: cls, ...attrs } = this.$attrs
      return attrs
    },
    attrs () {
      const attrs = {}

      for ( const prop in this.dirtyAttrs ) {
        if ( !this.events[ prop ] ) {
          attrs[ prop ] = this.dirtyAttrs[ prop ]
        }
      }

      return attrs
    },
  }
}
