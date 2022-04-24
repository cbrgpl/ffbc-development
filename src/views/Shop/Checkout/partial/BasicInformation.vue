<template >
  <div >
    <h3 >BasicInformation</h3>
    <div >

    </div>

    <SectionActions @show-next="emitSectionComplete" />
  </div>
</template>

<script>
import SectionActions from './SectionActions.vue'

import formValidations from './../validations/basicInformation'

export default {
  name: 'BasicInformation',
  emits: [ 'section-complete' ],
  methods: {
    emitSectionComplete () {
      this.$emit( 'section-complete' )
    }
  },
  components: {
    SectionActions
  }

}
</script>

<style lang="scss">

</style>
