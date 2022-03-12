<template >
  <section >
    <h5 :class="['underline mb-2', titleErrorClasses ]" >
      {{ name }}
    </h5>

    <ul class="flex flex-col md:flex-row md:space-x-4 lg:space-x-6 flex-wrap" >
      <li
        class="mb-1.5 py-2 last:mb-0"
        v-for="feature of featureFields"
        :key="feature.id" >
        <zRadioButton
          class="w-full md:w-auto"
          v-model="featureValue"
          :name="name"
          :value="feature.id" >
          {{ feature.name }}
        </zRadioButton>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'FeatureSection',
  props: {
    name: {
      type: String,
      required: true,
    },
    featureFields: {
      type: Array,
      required: true,
    },
    sectionValid: {
      type: Boolean,
      required: true,
    }
  },
  data () {
    return {
      featureValue: ''
    }
  },
  watch: {
    featureValue ( newValue ) {
      this.emitFeatureValue( this.name, newValue )
    },
  },
  computed: {
    titleErrorClasses () {
      return {
        'text-danger': !this.sectionValid
      }
    }
  },
  methods: {
    emitFeatureValue ( name, featureValue ) {
      this.$emit( 'setFeatureValue', name, featureValue )
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
