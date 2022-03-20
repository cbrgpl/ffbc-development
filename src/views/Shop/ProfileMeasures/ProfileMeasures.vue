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

    <div v-if="measureLoaded" >
      <zMeasureForm
        @measureSubmit="updateMeasureForm"
        :measure-fields="activeMeasure.measureFields"
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

import { ref } from 'vue'

export default {
  name: 'ProfileMeasures',
  data () {
    return {
      activeMeasure: null,
      loading: false,
    }
  },
  created () {
    this.setDefaultActiveMeasure()
  },
  computed: {
    measures () {
      return this.$store.getters[ 'measure/measures' ]
    },
    measuresLoaded () {
      return this.$store.getters[ 'measure/enumLoaded' ]
    },
    measureLoaded () {
      return this.measures[ 0 ] !== undefined
    }
  },
  methods: {
    changeActiveMeasure ( measure ) {
      this.activeMeasure = measure
    },
    async updateMeasureForm ( form ) {
      this.loading = true
      const apiForm = this.getAPIedMeasureField( form )
      const dispatch = await this.$store.dispatch( 'measure/setUserMeasure', apiForm )

      if ( dispatch.success ) {
        this.toast$.success( { summary: 'Measures have been successful updated' } )
      }

      this.loading = false
    },
    getAPIedMeasureField ( measureFields ) {
      return Object.entries( measureFields ).map( ( measureField ) => ( { id: measureField[ 0 ], value: measureField[ 1 ].value } ) )
    },
    setDefaultActiveMeasure () {
      const unwatch = ref( null )
      unwatch.value = this.$watch(
        'measuresLoaded',
        async ( measuresLoaded ) => {
          if ( measuresLoaded ) {
            this.activeMeasure = this.measures[ 0 ]
            this.deferredUnwatch( unwatch )
          }
        },
        {
          immediate: true,
        }
      )
    },
    deferredUnwatch ( unwatch ) {
      setTimeout( () => unwatch.value(), 0 )
    }
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
