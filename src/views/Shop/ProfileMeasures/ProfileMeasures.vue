<template >
  <section class="shop-main_padding" >

    <div class="flex max-w-full overflow-x-auto py-2.5" >
      <zTabsNav
        class="profile-measures__tab-nav"
        :tabs="measures"
        :model-value="activeMeasure"
        @update:modelValue="changeActiveMeasure" >
        <template v-slot="{ tab }" >
          <div class="profile-measures__tab flex justify-center" >
            {{ tab.name }}
          </div>
        </template>
      </zTabsNav>
    </div>

    <div >
      <zMeasureForm
        @measureSubmit="updateMeasureForm"
        :form-fields="formFields"
        :measure-field-component="$options.components.zMeasureFieldInput" >

        <template #formActions >
          <zDivider class="my-3" ></zDivider>

          <zLoaderButton
            class="w-full sm:w-auto px-16 py-3 float-right"
            :loader="loading" >
            Submit
          </zLoaderButton>
        </template>

      </zMeasureForm>
    </div>
  </section>
</template>

<script>
import zMeasureForm from '@components/composite/zMeasureForm.vue'
import zMeasureFieldInput from '@components/composite/zMeasureFieldInput.vue'

export default {
  name: 'ProfileMeasures',
  data () {
    return {
      activeMeasure: null,
      loading: false,
    }
  },
  created () {
    this.setDefaultMeasure()
  },
  computed: {
    measures () {
      return this.$store.getters[ 'measure/measures' ]
    },
    userId () {
      return this.$store.getters[ 'user/id' ]
    },
    activeMeasureFields () {
      return this.activeMeasure.measureFields.map( ( measureField ) => measureField.id )
    },
    userMeasureFields () {
      return this.$store.getters[ 'measure/userMeasureFields' ]( this.activeMeasureFields )
    },
    formFields () {
      return this.activeMeasure.measureFields.map( ( measureField ) => {
        const userField = this.userMeasureFields.find( ( userField ) => userField.measureField === measureField.id )
        const fieldValue = userField ? userField.value : ''

        return {
          name: measureField.name,
          id: measureField.id,
          value: fieldValue
        }
      } )
    }
  },
  methods: {
    changeActiveMeasure ( measure ) {
      this.activeMeasure = measure
    },
    async updateMeasureForm ( form ) {
      this.loading = true
      const apiForm = this.getAPIedMeasureField( form )
      await this.$store.dispatch( 'measure/setUserMeasures', apiForm )

      this.toast$.success( { summary: 'Measures have been successful updated' } )

      this.loading = false
    },
    getAPIedMeasureField ( measureFields ) {
      return Object.entries( measureFields ).map( ( measureField ) => ( { measureField: parseInt( measureField[ 0 ] ), value: measureField[ 1 ].value, user: this.userId } ) )
    },
    setDefaultMeasure () {
      this.activeMeasure = this.measures[ 0 ]
    },

  },
  components: {
    zMeasureForm,
    zMeasureFieldInput
  }
}
</script>

<style lang="scss" scoped>
.profile-measures__tab-nav {
  overflow: visible;
}

.profile-measures__tab {
  min-width: rem(45px);
}
</style>
