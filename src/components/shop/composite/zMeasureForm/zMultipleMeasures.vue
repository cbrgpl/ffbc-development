<template >
  <div >
    <div class="mb-6" >
      <zMeasureForm
        v-for="measure of measures"
        :key="measure.id"
        ref="measures"
        :title="measure.name"
        :form-fields="measure.measureFields"
        @measureSubmit="collectMeasure" />
    </div>

    <zButton
      v-if="button"
      class="w-full md:w-28 py-3"
      @click="submit" >
      Submit
    </zButton>
  </div>
</template>

<script >
import zMeasureForm from './zMeasureForm'

export default {
  name: 'ZMultipleMeasures',
  expose: [ 'submit' ],
  components: {
    zMeasureForm
  },
  props: {
    measures: {
      type: Array,
      required: true,
    },
    button: {
      type: Boolean,
      default: false
    },
  },
  emits: [ 'submitted' ],
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

      for( const $measure of this.$refs.measures ) {
        $measure.submitForm()
      }

    },
  }
}
</script>

<style lang="scss" scoped >

</style>
