export default {
  props: {
    modelValue: {
      type: [ Object, Array, String, Boolean, Number ],
    },
  },
  computed: {
    attrs () {
      const { ...attrs } = this.$attrs
      delete attrs[ 'onUpdate:modelValue' ]

      return attrs
    }
  },
}
