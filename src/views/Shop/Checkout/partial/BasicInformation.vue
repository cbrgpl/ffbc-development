<template >
  <div >
    <UserForm @formSubmitted="emitSectionComplete" >
      <template #actions >
        <SectionActions />
      </template>
    </UserForm>
  </div>
</template>

<script >
import UserForm from '@general_components/composite/UserForm/UserForm.vue'
import SectionActions from './SectionActions.vue'

export default {
  name: 'BasicInformation',
  components: {
    SectionActions,
    UserForm
  },
  emits: [ 'sectionComplete' ],
  methods: {
    emitSectionComplete ( userData ) {
      this.$emit( 'sectionComplete', {
        sectionName: this.$options.name,
        payload: userData
      } )
    }
  }

}
</script>

<style lang="scss" >

</style>
