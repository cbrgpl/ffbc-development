<template >
  <div >
    <UserForm @form-submitted="emitSectionComplete" >
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
  emits: [ 'section-complete' ],
  methods: {
    emitSectionComplete ( userData ) {
      this.$emit( 'section-complete', {
        sectionName: this.$options.name,
        payload: userData
      } )
    }
  }

}
</script>

<style lang="scss" >

</style>
