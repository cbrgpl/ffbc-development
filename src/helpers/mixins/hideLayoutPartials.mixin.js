export default {
  props: {
    hiddenElems: {
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
