export default {
  inheritAttrs: false,

  computed: {
    attrs () {
      const { style, class: cls, ...attrs } = this.$attrs
      return attrs
    },
    styles () {
      return {
        class: this.$attrs.class,
        style: this.$attrs.style
      }
    }
  }
}
