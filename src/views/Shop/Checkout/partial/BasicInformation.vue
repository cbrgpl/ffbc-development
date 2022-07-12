<template >
  <div >
    <UserForm
      ref="userForm"
      :button="false"
      @form-submitted="emitSectionCompleted" >
    </UserForm>
  </div>
</template>

<script >
import UserForm from '@general_components/composite/UserForm/UserForm.vue'

import CheckoutSectionMix from '@mixins/CheckoutSection'

export default {
  name: 'BasicInformation',
  expose: [ 'completeSection' ],
  components: {
    UserForm
  },
  mixins: [ CheckoutSectionMix ],
  methods: {
    // Public
    completeSection () {
      this.$refs.userForm.toggleFormValidateMethod()
    },


    // Private
  }

}
</script>

<style lang="scss" >

</style>
