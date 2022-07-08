<template >
  <div class="flex flex-col" >
    <h4 class="mb-3" >
      Test page
    </h4>

    <zMultipleMeasures
      ref="form"
      class="mb-8"
      :measures="measures"
      @submitted="test" >
    </zMultipleMeasures>

    <pre >
      {{ measures }}
    </pre>
  </div>
</template>

<script >
import zMultipleMeasures from '@shop_components/composite/zMeasureForm/zMultipleMeasures.vue'

export default {
  name: 'Preview',
  components: {
    zMultipleMeasures,
  },
  data () {
    return {
      loading: true,
      measures: [
        [
          {
            id: 'q',
            name: 'q',
            value: 10
          },
          {
            id: 'w',
            name: 'w'
          },
          {
            id: 'e',
            name: 'e'
          }
        ],
        [
          {
            id: 'a',
            name: 'a',
            value: 65
          },
          {
            id: 'd',
            name: 'd'
          },
          {
            id: 'c',
            name: 'c'
          }
        ]
      ],
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.submitForm()
    },
    test ( ev ) {
      console.log( ev )
    },
  }

}
</script>

<style lang="scss" scoped >
</style>
