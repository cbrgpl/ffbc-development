export default {
  props: {
    hiddenElems: {
      type: Array,
      required: true
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
