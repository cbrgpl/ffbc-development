export default {
  props: {
    preventContentExtend: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contentWrapperClasses () {
      return {
        'flex-grow overflow-y-auto': this.preventContentExtend
      }
    }
  },
}
