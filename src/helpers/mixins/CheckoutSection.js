import { throwErrorInAbstractMethod } from '@functions/throwErrorInAbstractMethod'

export default {
  emits: [ 'sectionCompleted' ],
  methods: {
    // Public
    completeSection() {
      throwErrorInAbstractMethod( 'public', 'completeSection' )
    },


    // Private
    emitSectionCompleted( payload ) {
      this.$emit( 'sectionCompleted', payload )
    }
  }
}