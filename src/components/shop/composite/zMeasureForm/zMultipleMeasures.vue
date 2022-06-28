<template >
  <div >
    <div class="mb-6" >
      <zMeasureForm
        :key="i"
        v-for="(measure, i ) of measures"
        :ref="'measure-' + i"
        :form-fields="measure"
        @measureSubmit="collectMeasure" />
    </div>

    <zButton
      class="w-full md:w-28 py-3"
      @click="submit" >
      Submit
    </zButton>

  </div>
</template>

<script>
import zMeasureForm from './zMeasureForm'

export default {
  name: 'zMultipleMeasures',
  expose: [ 'submit' ],
  emits: [ 'submitted' ],
  props: {
    measures: {
      type: Array,
      required: true,
    }
  },
  data () {
    return {
      measureValues: []
    }
  },
  watch: {
    measureValues ( measureValues ) {
      if ( measureValues.length === this.measures.length ) {
        this.$emit( 'submitted', this.measureValues )
      }
    },
  },
  methods: {
    collectMeasure ( measure ) {
      this.measureValues.push( measure )
    },
    submit () {
      this.measureValues = []

      for ( const ref in this.$refs ) {
        this.$refs[ ref ].submitForm()
      }
    },
  },
  components: {
    zMeasureForm
  }
}
</script>

<style lang="scss" scoped>

</style>
