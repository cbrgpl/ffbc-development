import { ErrorWithDescription } from '@errors'
let mixInstanceNumber = 0

export default {
  data () {
    return {
      callerId: mixInstanceNumber++
    }
  },
  created () {
    this.pushCloseCaller()
  },
  methods: {
    pushCloseCaller () {
      const escCloseCaller = {
        closeFn: this.closeFn,
        getCallCondition: this.getCallCondition,
        callerId: this.callerId,
      }

      this.$store.commit( 'app/pushEscCloseCaller', escCloseCaller )
    },
    closeFn () {
      throw new ErrorWithDescription( 'closeFn must have implementation in mix component' )
    },
    getCallCondition () {
      return true
    }
  },
  beforeUnmount () {
    this.$store.commit( 'app/removeEscCloseCaller', this.callerId )
  }
}
