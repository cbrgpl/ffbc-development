export default {
  props: {
    hiddenPartials: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    partialVisible ( partialName ) {
      return !this.hiddenPartials.includes( partialName )
    }
  }
}
