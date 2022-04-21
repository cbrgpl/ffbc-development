export default {
  props: {
    hiddenPartials: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    hidden () {
      return this.hiddenElems.reduce( ( hidden, elem ) => {
        hidden[ elem ] = true
        return hidden
      }, {} )
    }
  }
}
