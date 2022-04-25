<template >
  <div >
    <UserForm  @form-submitted="emitSectionComplete" >
      <template #actions >
        <SectionActions />
      </template>
    </UserForm>

  </div>
</template>

<script>
import UserForm from '@components/composite/UserForm/UserForm.vue'
import SectionActions from './SectionActions.vue'

export default {
  name: 'BasicInformation',
  emits: [ 'section-complete' ],
  methods: {
    emitSectionComplete ( userData ) {
      this.$emit( 'section-complete', {
        name: this.$options.name,
        payload: userData
      } )
    }
  },
  components: {
    SectionActions,
    UserForm
  }

}
</script>

<style lang="scss">

</style>
