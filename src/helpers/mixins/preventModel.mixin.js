export default {
  props: {
    modelValue: {
      type: [ Object, Array, String, Boolean, Number ],
      required: true,
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
